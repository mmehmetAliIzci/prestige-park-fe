declare interface Parking {
  id: number;
  slots: number;
  geom: GeoJSONPoint;
  business_hours_start: string;
  business_hours_end: string;
  promoted: boolean;
  facilities: { [key: string]: boolean};
  parking_types: { [key: string]: boolean};
  language: string;
  neighborhood: string;
  description: string;
  hourly_rate: string;
  monthly_rate: string;
  contact_details: string;
  location_details: string;
  name: string;
  image_urls: string[];
  owner_type: string;
  district_code_id: number;
}

declare interface GeoJSONPoint {
  coordinates: number[];
  type: string;
}