import { Locale } from '@/i18n-config';
import { getDictionary } from '../../get-dictionary';
import { SearchPageContent } from '@components/organisms/searchPage';

type SearchParams = {
  params: {
    areaId: string;
    lang: Locale;
  };
  searchParams: { [key: string]: string | undefined };
};

async function getParkingsForArea(
  lang: string,
  district?: string
): Promise<Parking[]> {
  try {
    const res = await fetch(
      `http://localhost:3000/api/parkings/search/district/${district}?lang=${lang}`
    );
    if (res.status !== 200) {
      throw new Error('BE API returned not 200');
    }

    const data = await res.json();
    return data;
  } catch (e: any) {
    console.error(
      e.message || 'Something went wrong while fetching parkings for area'
    );
    console.error(e);
    return [];
  }
}

async function getDistricts(): Promise<District[]> {
  try {
    const res = await fetch(`http://localhost:3000/api/district`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function SearchPage({
  params: { lang },
  searchParams: { district },
}: SearchParams) {
  const parkings = await getParkingsForArea(lang, district);
  const districts = await getDistricts();
  const dictionary = await getDictionary(lang);

  return (
    <SearchPageContent
      dictionary={dictionary}
      districts={districts}
      parkings={parkings}
    />
  );
}
