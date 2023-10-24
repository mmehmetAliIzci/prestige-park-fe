import { defaultLocale } from '@/i18n-config';
import { env } from '@lib/env.mjs';

import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || defaultLocale;
  const district = searchParams.get('district') || '';

  try {
    const _ = getParkingsSchema.parse({
      lang,
      district,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid parameters' });
  }

  try {
    const data = await fetch(
      `${env.BE_URL}/${lang}/parking/search?district=${district}`
    );
    const jsonData = await data.json();
    if (!data.ok) {
      throw new Error(jsonData.error || 'Unknown error');
    }
    return NextResponse.json(jsonData);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export const getParkingsSchema = z.object({
  lang: z.string().min(2),
  district: z.string(),
});
