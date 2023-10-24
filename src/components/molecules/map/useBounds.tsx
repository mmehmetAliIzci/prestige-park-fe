import {MapMarker} from "@components/molecules/map/mapView";
import Leaflet, { LatLngBoundsLiteral } from "leaflet";
import {useEffect} from "react";
import {useMap} from "react-leaflet";

export const useBounds = (markers: MapMarker[]) => {
  const map = useMap();

  useEffect(() => {
    if (markers && markers.length > 0) {
      const latLngs = markers.map((marker) => [
        marker.position[1],
        marker.position[0],
      ]);
      const bounds = new Leaflet.LatLngBounds(latLngs as LatLngBoundsLiteral);
      map.fitBounds(bounds);
    }
  }, [markers, map]);

  return null;
};
