import { defaultLocale } from '@/i18n-config';
import { env } from '@lib/env.mjs';

import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || defaultLocale;

  const body = await request.json();

  try {
    const parsedPayload = getByBboxSchema.safeParse({
      bbox: body.bbox,
    });

    if (!parsedPayload.success) {
      throw new Error('Invalid parameters');
    }

    const response = await fetch(`${env.BE_URL}/${lang}/parking/search/bbox`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(convertToBackendFormat(parsedPayload.data.bbox)),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Unknown error');
    }

    const jsonData = await response.json();
    return NextResponse.json(jsonData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// {
//     "_southWest": {
//         "lat": 13.707947269193953,
//         "lng": 100.55468559265138
//     },
//     "_northEast": {
//         "lat": 13.761141447707768,
//         "lng": 100.58858871459962
//     }
// }

type Bbox = {
  _southWest: { lat: number; lng: number };
  _northEast: { lat: number; lng: number };
};

type BEBBox = {
  min_lat: number;
  min_lon: number;
  max_lat: number;
  max_lon: number;
};
export const getByBboxSchema = z.object({
  bbox: z.object({
    _southWest: z.object({ lat: z.number(), lng: z.number() }),
    _northEast: z.object({ lat: z.number(), lng: z.number() }),
  }),
});

function convertToBackendFormat(feData: Bbox): BEBBox {
  const beData = {
    min_lat: feData._southWest.lat,
    min_lon: feData._southWest.lng,
    max_lat: feData._northEast.lat,
    max_lon: feData._northEast.lng,
  };
  return beData;
}
