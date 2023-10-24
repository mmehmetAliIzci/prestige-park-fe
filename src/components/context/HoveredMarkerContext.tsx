import { createContext, useState } from 'react';

export const HoveredMarkerContext = createContext<{
  hoveredMarkerId: number;
  setHoveredMarkerId: (value: ((prevState: number) => number) | number) => void;
}>(null);

export const HoveredMarkerProvider = ({ children }) => {
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number>(null);

  return (
    <HoveredMarkerContext.Provider
      value={{ hoveredMarkerId, setHoveredMarkerId }}
    >
      {children}
    </HoveredMarkerContext.Provider>
  );
};
