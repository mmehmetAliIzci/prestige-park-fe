'use client';
import ParkingCard from '@components/molecules/parkingCard/parkingCard';
import { HoveredMarkerContext } from '@components/context/HoveredMarkerContext';
import { useContext } from 'react';

const ParkingList = ({ parkings }) => {
  const { setHoveredMarkerId } = useContext(HoveredMarkerContext);

  const handleMouseEnter = (id: number) => () => setHoveredMarkerId(id);
  const handleMouseLeave = () => setHoveredMarkerId(null);

  return (
    <div className='xs:grid-cols-1 grid grid-cols-1 content-start gap-2 lg:grid-cols-2 xl:grid-cols-3'>
      {parkings ? (
        parkings.map((parking) => (
          <ParkingCard
            key={parking.id}
            parking={parking}
            onMouseEnter={handleMouseEnter(parking.id)}
            onMouseLeave={handleMouseLeave}
          />
        ))
      ) : (
        <div>no parkings</div>
      )}
    </div>
  );
};

export default ParkingList;
