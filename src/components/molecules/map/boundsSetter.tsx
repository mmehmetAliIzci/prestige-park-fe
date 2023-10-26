import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import Leaflet, { LatLngBoundsLiteral } from 'leaflet';
import { MapMarker } from '@components/molecules/map/mapView';

const BoundsSetter: React.FC<{ markers: MapMarker[] }> = React.memo(
  ({ markers }) => {
    const map = useMap();

    useEffect(() => {
      if (markers && markers.length > 0) {
        const latLngs = markers.map((marker) => [
          marker.position[0],
          marker.position[1],
        ]);
        const bounds = new Leaflet.LatLngBounds(latLngs as LatLngBoundsLiteral);
        map.fitBounds(bounds);
      }
    }, [markers, map]);

    return null;
  }
);

BoundsSetter.displayName = 'BoundsSetter';

export default BoundsSetter;
