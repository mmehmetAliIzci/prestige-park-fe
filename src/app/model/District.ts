declare interface District {
  id: number;
  area_sqkm: number;
  district_code: string;
  district_name: string;
  district_name_latin: string;
  pcode: string;
  province_name: string;
  geom: number[];
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}