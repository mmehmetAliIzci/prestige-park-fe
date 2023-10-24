import { ReactNode, createContext, useState } from 'react';

export type HoveredMarkerContextType = {
    hoveredMarkerId: number;
    setHoveredMarkerId: (value: ((prevState: number) => number) | number) => void;
  }
export const HoveredMarkerContext = createContext<HoveredMarkerContextType>(null as unknown as HoveredMarkerContextType);

export const HoveredMarkerProvider = ({ children }: {children: ReactNode}) => {
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number>(0);

  return (
    <HoveredMarkerContext.Provider
      value={{ hoveredMarkerId, setHoveredMarkerId }}
    >
      {children}
    </HoveredMarkerContext.Provider>
  );
};
