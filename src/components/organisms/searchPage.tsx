'use client';
import { WithDictionary } from '@lib/types';
import dynamic from 'next/dynamic';
import SearchInput from '@components/molecules/searchInput/searchInput';
import ParkingCard from '@components/molecules/parkingCard/parkingCard';
import { useEffect, useMemo } from 'react';
import { HoveredMarkerProvider } from '@components/context/HoveredMarkerContext';
import ParkingList from '@components/molecules/parkingsList/parkingsList';

export type SearchPageProps = WithDictionary<{
  parkings: Parking[];
  districts: District[];
}>;

const DynamicMapView = dynamic(
  () => import('@components/molecules/map/mapView'),
  {
    ssr: false,
  }
);

export const SearchPageContent = ({
  parkings,
  districts,
  dictionary,
}: SearchPageProps) => {
  const parkingMarkers = useMemo(
    () =>
      parkings.map((parking) => ({
        id: parking.id,
        position: [parking.geom.coordinates[1], parking.geom.coordinates[0]] as [number, number],
        description: parking.name,
      })),
    [parkings]
  );

  return (
    <div className='flex min-h-screen flex-col items-center py-2'>
      <SearchInput
        districts={districts}
        dictionary={dictionary['search_input']}
      />
      <HoveredMarkerProvider>
        <div className='grid w-full grid-cols-2'>
          <ParkingList parkings={parkings} />
          <div className='min-h-80vh p-2'>
            <DynamicMapView
              key={new Date().getTime()}
              markers={parkingMarkers}
            />
          </div>
        </div>
      </HoveredMarkerProvider>
    </div>
  );
};
