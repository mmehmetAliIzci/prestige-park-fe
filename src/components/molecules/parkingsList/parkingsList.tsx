'use client';
import ParkingCard from '@components/molecules/parkingCard/parkingCard';
import { ParkingContext } from '@components/context/ParkingContext';
import { useContext } from 'react';

const ParkingList: React.FC = () => {
  const { setHoveredMarkerId, parkings } = useContext(ParkingContext);

  const handleMouseEnter = (id: number) => () => setHoveredMarkerId(id);
  const handleMouseLeave = () => setHoveredMarkerId(0);

  return (
    <div className='hidden md:grid md:grid-cols-1 md:content-start md:gap-2 lg:grid-cols-2 xl:grid-cols-3'>
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
