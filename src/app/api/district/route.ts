import { env } from '@lib/env.mjs';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await fetch(`${env.BE_URL}/district`);
    const jsonData = await data.json();
    return NextResponse.json(jsonData); // Pass the resolved JSON data here
  } catch (error) {
    return NextResponse.json({ error });
  }
}
