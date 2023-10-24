import { defaultLocale } from '@/i18n-config';
import { env } from '@lib/env.mjs';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || defaultLocale;
  const id = searchParams.get('id') || '';

  try {
    const data = await fetch(`${env.BE_URL}/${lang}/parking/${id}`);
    const jsonData = await data.json();
    if (!data.ok) {
      throw new Error(jsonData.error || 'Unknown error');
    }
    return NextResponse.json(jsonData);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
