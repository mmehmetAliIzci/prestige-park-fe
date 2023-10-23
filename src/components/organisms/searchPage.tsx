'use client'
import {WithDictionary} from "@lib/types";
import dynamic from "next/dynamic";
import SearchInput from "@components/molecules/searchInput/searchInput";
import ParkingCard from "@components/molecules/parkingCard/parkingCard";
import {useEffect, useMemo} from "react";

export type SearchPageProps = WithDictionary<{
  parkings: Parking[];
  districts: District[];
}>

const DynamicMapView = dynamic(
  () => import("@components/molecules/map/mapView"),
  {
    ssr: false,
  }
);

export const SearchPageContent = ({parkings, districts, dictionary}: SearchPageProps ) => {

  const parkingMarkers = useMemo(() => {
    return parkings.map((parking) => {
      return {
        id: parking.id,
        position: parking.geom.coordinates,
        description: parking.name,
      };
    });
  }, [parkings]);

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <SearchInput
        districts={districts}
        dictionary={dictionary["search_input"]}
      />
      <div className="grid grid-cols-2 w-full">
        <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 content-start">
          {parkings ? (
            parkings.map((parking) => (
              <ParkingCard key={parking.id} parking={parking} />
            ))
          ) : (
            <div>no parkings</div>
          )}
        </div>
        <div className="p-2 h-80vh">
          <DynamicMapView key={new Date().getTime()} markers={parkingMarkers}/>
        </div>
      </div>
    </div>
  )
}
