'use client'
import {WithDictionary} from "@lib/types";
import dynamic from "next/dynamic";
import SearchInput from "@components/molecules/searchInput/searchInput";
import ParkingCard from "@components/molecules/parkingCard/parkingCard";
import {useEffect, useMemo} from "react";
import {HoveredMarkerProvider} from "@components/context/HoveredMarkerContext";
import ParkingList from "@components/molecules/parkingsList/parkingsList";

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
  const parkingMarkers = useMemo(() => (
    parkings.map((parking) => (
      {
        id: parking.id,
        position: parking.geom.coordinates,
        description: parking.name,
      }
    ))) , [parkings]);

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <SearchInput
        districts={districts}
        dictionary={dictionary["search_input"]}
      />
      <HoveredMarkerProvider>
        <div className="grid grid-cols-2 w-full">
          <ParkingList parkings={parkings}/>
          <div className="p-2 min-h-80vh">
            <DynamicMapView key={new Date().getTime()} markers={parkingMarkers}/>
          </div>
        </div>
      </HoveredMarkerProvider>

    </div>
  )
}
