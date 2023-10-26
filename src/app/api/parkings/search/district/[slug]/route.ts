import { defaultLocale } from '@/i18n-config';
import { env } from '@lib/env.mjs';

import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || defaultLocale;
  const district = params.slug ?? '';

  try {
    const parsedData = getParkingsSchema.safeParse({ lang, district });

    if (!parsedData.success) {
      throw new Error('Invalid parameters');
    }

    const response = await fetch(
      `${env.BE_URL}/${lang}/parking/search/district/${district}`
    );

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

export const getParkingsSchema = z.object({
  lang: z.string().min(2),
  district: z.string(),
});
