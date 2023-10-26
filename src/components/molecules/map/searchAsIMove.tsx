import { Checkbox } from '@components/atoms/checkbox';
import { Label } from '@components/atoms/label';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { debounce } from '@lib/debounce/debounce';
import { BBox } from 'geojson';
import { LatLngBounds } from 'leaflet';
import { ParkingContext } from '@components/context/ParkingContext';

const SearchAsIMove: React.FC = () => {
  const { updateParkingsByBBox } = useContext(ParkingContext);
  const [searchAsIMove, setSearchAsIMove] = useState(false);

  function updateParkings() {
    return debounce(async () => {
      if (searchAsIMove) {
        const bounds = map.getBounds();
        console.warn('Bounds changed to:', bounds);
        // Find me: here i somehow have to change the markers both on map and the list
        await updateParkingsByBBox(bounds);
      }
    }, 500);
  }

  const map = useMapEvents({
    dragend: updateParkings(),
    zoomend: updateParkings(),
  });

  return (
    <div className='z-aboveMap top absolute right-1 top-1 flex items-center space-x-2 bg-white p-1'>
      <Checkbox
        checked={searchAsIMove}
        onCheckedChange={(checked) => setSearchAsIMove(checked as boolean)}
        id='search-as-i-move'
      />
      <Label htmlFor='search-as-i-move'>Search as I move</Label>
    </div>
  );
};

export default SearchAsIMove;
