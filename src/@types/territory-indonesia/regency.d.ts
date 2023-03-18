declare module "territory-indonesia" {
  export type Regency = {
    name: string;
    id: string;
    province_id: string;
    alt_name: string;
    latitude: number | null;
    longitude: number | null;
  };

  export function getAllRegencies(): Promise<Regency[]>;
  export function getRegencyById(id: string): Promise<Regency>;
  export function getRegencyByName(name: string): Promise<Regency>;
  export function getRegenciesOfProvince(
    provinceId: string
  ): Promise<Regency[]>;
  export function getRegenciesOfProvinceId(
    provinceId: string
  ): Promise<Regency[]>;
  export function getRegenciesOfProvinceName(
    provinceName: string
  ): Promise<Regency[]>;
}
