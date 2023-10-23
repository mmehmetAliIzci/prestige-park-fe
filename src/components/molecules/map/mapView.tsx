"use client";
import React, {useEffect, useMemo} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leaflet from 'leaflet';
import { cn } from "@utils";
import {useIsomorphicLayoutEffect} from "@lib/hooks/useIsomorphicLayoutEffect";

export type MapMarker = {
    id: string;
    position: [number, number];
    description: string;
}

export type MapViewProps = {
    className?: string;
    markers?: MapMarker[]
};

const BoundsSetter: React.FC = React.memo(({ markers }) => {
    const map = useMap();

    useEffect(() => {
        if (markers && markers.length > 0) {
            const latLngs = markers.map(marker => [marker.position[1], marker.position[0]]);
            const bounds = new Leaflet.LatLngBounds(latLngs);
            map.fitBounds(bounds);
        }
    }, [markers, map]);

    return null;
});

const MapView: React.FC = ({ className, markers, center }: MapViewProps) => {
    useIsomorphicLayoutEffect(() => {
        (async function init() {
            try{
                // @ts-expect-error
                delete Leaflet.Icon.Default.prototype._getIconUrl;
                Leaflet.Icon.Default.mergeOptions({
                    iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
                    iconUrl: "/leaflet/images/marker-icon.png",
                    shadowUrl: "/leaflet/images/marker-shadow.png",
                });
            }catch (e){
                debugger;
            }

        })();
    }, []);

    useEffect(() => {
        console.warn("markers changed", markers)
    }, [markers])

    const markersMemo = useMemo(() => markers, [markers]);  // Memoize markers to prevent unnecessary re-renders

    return (
        <MapContainer
            center={[13.738699, 100.561619]}
            zoom={3}
            scrollWheelZoom={false}
            className={cn("w-full h-full z-20", className)}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <BoundsSetter markers={markersMemo} />

            {markersMemo?.map((marker: MapMarker) => {
                return (
                  <Marker key={marker.id} position={[marker.position[1],marker.position[0]]}>
                      <Popup>
                          {marker.description} {marker.position}
                      </Popup>
                  </Marker>
                )})
            }
        </MapContainer>
    );
};

export default MapView;
