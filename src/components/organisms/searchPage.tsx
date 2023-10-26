'use client';
import { WithDictionary } from '@lib/types';
import dynamic from 'next/dynamic';
import SearchInput from '@components/molecules/searchInput/searchInput';
import { useMemo } from 'react';
import { ParkingProvider } from '@components/context/ParkingContext';
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
  return (
    <div className='flex min-h-screen flex-col items-center py-2'>
      <SearchInput
        districts={districts}
        dictionary={dictionary['search_input']}
      />
      <ParkingProvider initialParkings={parkings}>
        <div className='grid w-full grid-cols-1 md:grid-cols-2'>
          <ParkingList />
          <div className='min-h-80vh p-2'>
            <DynamicMapView key={Date.now()} />
          </div>
        </div>
      </ParkingProvider>
    </div>
  );
};
