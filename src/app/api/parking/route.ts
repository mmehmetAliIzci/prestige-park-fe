import { defaultLocale } from "@/i18n-config";
import { env } from "@lib/env.mjs";

import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  console.error("witnes mee")
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get("lang") || defaultLocale
  const district = searchParams.get("district") || ""
  try {
    const data = await fetch(`${env.BE_URL}/${lang}/parking/search?district=${district}`);
    const jsonData = await data.json();  // Await the resolution of the Promise here
    return NextResponse.json(jsonData);  // Pass the resolved JSON data here
  } catch (error) {
    return NextResponse.json({ error });
  }
}


export const getParkingsSchema = z.object({
  lang: z.string().min(2),
  areaId: z.string(),
});
