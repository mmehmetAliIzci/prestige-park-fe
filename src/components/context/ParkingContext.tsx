import { ReactNode, createContext, useState, useCallback } from 'react';
import { LatLngBounds } from 'leaflet';

export type ParkingContextType = {
  hoveredMarkerId: number;
  setHoveredMarkerId: (value: ((prevState: number) => number) | number) => void;
  parkings: Parking[];
  updateParkingsByBBox: (bounds: LatLngBounds) => Promise<void>;
};
export const ParkingContext = createContext<ParkingContextType>(
  null as unknown as ParkingContextType
);

export const ParkingProvider = ({
  children,
  initialParkings,
}: {
  children: ReactNode;
  initialParkings: Parking[];
}) => {
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number>(0);
  const [parkings, setParkings] = useState(initialParkings);

  const updateParkingsByBBox = useCallback(async (bounds: LatLngBounds) => {
    const newParkings = await getParkingsForBbox(bounds);
    setParkings(newParkings);
  }, []);

  return (
    <ParkingContext.Provider
      value={{
        hoveredMarkerId,
        setHoveredMarkerId,
        parkings,
        updateParkingsByBBox,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

const getParkingsForBbox = async (bbox?: LatLngBounds): Promise<Parking[]> => {
  try {
    debugger;
    const res = await fetch(`http://localhost:3000/api/parkings/search/bbox`, {
      method: 'POST',
      body: JSON.stringify({ bbox }),
    });
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
};
