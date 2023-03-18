declare module "territory-indonesia" {
  type Province = {
    name: string;
    id: string;
    alt_name: string;
    latitude: number | null;
    longitude: number | null;
  };

  export function getAllProvinces(): Promise<Province[]>;
  export function getProvinceById(id: string): Promise<ProviderExoticComponent>;
  export function getProvinceByName(name: string): Promise<Province>;
}
