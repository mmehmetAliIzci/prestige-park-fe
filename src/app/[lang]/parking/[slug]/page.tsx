import { Locale } from "@/i18n-config";
import ParkingPageContent from "@components/organisms/parkingPage";
import { ReactNode } from "react";

async function getParkingFromId(id: string, lang: string): Promise<Parking | undefined> {
  if (id !== "") {
    try {
      const res = await fetch(`http://localhost:3000/api/parkings?lang=${lang}&id=${id}`);
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
  return undefined;
}

export default async function ParkingPage({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const parking = await getParkingFromId(slug, lang);

  return (
    <ParkingPageContent parking={parking} />
  );
}
