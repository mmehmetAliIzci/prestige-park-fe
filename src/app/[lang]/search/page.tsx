import { Locale } from "@/i18n-config";

type SearchParams = {
  params: {
    areaId: string;
    lang: Locale;
  };
  searchParams: { [key: string]: string | undefined };
};

async function getParkingsForArea(
  lang: string,
  areaId?: string
): Promise<Parking[]> {
  try {
    const res = await fetch(
      `http://localhost:3000/api/parking?district=${areaId}&lang=${lang}`
    );
    if (res.status !== 200) {
      console.error("BE API returned not 200")
      return [];
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Something went wrong connecting to the BE API while fetching parkings")
    console.error(e);
    return [];
  }
}

export default async function SearchPage({
  params: { lang },
  searchParams: { district },
}: SearchParams) {
  const parking = await getParkingsForArea(lang, district);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">Search Page</h1>
      Area id {district}
    </div>
  );
}
