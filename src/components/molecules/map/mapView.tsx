'use client';
import React, { FormEvent, useContext, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import { cn } from '@utils';
import { useIsomorphicLayoutEffect } from '@lib/hooks/useIsomorphicLayoutEffect';
import { ParkingContext } from '@components/context/ParkingContext';
import Link from 'next/link';
import { Checkbox } from '@components/atoms/checkbox';
import { Label } from '@components/atoms/label';
import BoundsSetter from '@components/molecules/map/boundsSetter';
import SearchAsIMove from '@components/molecules/map/searchAsIMove';

export type MapMarker = {
  id: number;
  position: number[];
  description: string;
};

export type MapViewProps = {
  className?: string;
  markers?: MapMarker[] | [];
};

const MapView: React.FC<MapViewProps> = ({ className, markers }) => {
  const { hoveredMarkerId, parkings } = useContext(ParkingContext);

  const markersMemo = useMemo(() => {
    return parkings.map((parking) => ({
      id: parking.id,
      position: [parking.geom.coordinates[1], parking.geom.coordinates[0]],
      description: parking.name,
    }));
  }, [parkings]); // Memoize markers to prevent unnecessary re-renders

  useIsomorphicLayoutEffect(() => {
    (async function init() {
      try {
        // @ts-expect-error
        delete Leaflet.Icon.Default.prototype._getIconUrl;
        Leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
          iconUrl: '/leaflet/images/marker-icon.png',
          shadowUrl: '/leaflet/images/marker-shadow.png',
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <MapContainer
      center={[13.738699, 100.561619]}
      zoom={3}
      scrollWheelZoom={false}
      className={cn('z-20 h-full w-full', className)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <BoundsSetter markers={markersMemo} />
      <SearchAsIMove />
      {markersMemo?.map((marker: MapMarker) => {
        console.warn('marker', marker);
        return (
          <Marker
            key={marker.id}
            position={[marker.position[0], marker.position[1]]}
            icon={marker.id === hoveredMarkerId ? hoveredIcon : normalIcon}
          >
            <Popup>
              {marker.description}{' '}
              <Link href={`/parking/${marker.id}`}>Details</Link>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

const normalIcon = new Leaflet.Icon({
  iconUrl: '/leaflet/images/marker-icon-2x.png',
  iconSize: [25, 40],
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
});

const hoveredIcon = new Leaflet.Icon({
  iconUrl: '/leaflet/images/map-marker-hovered.svg', // Replace with the path to your large icon
  iconSize: [40, 40],
});

export default MapView;
