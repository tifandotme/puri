declare module "territory-indonesia" {
  type District = {
    name: string;
    id: string;
    regency_id: string;
    alt_name: string;
    latitude: number | null;
    longitude: number | null;
  };

  export function getAllDistricts(): Promise<District[]>;
  export function getDistrictById(id: string): Promise<District>;
  export function getDistrictByName(name: string): Promise<District>;
  export function getDistrictsOfRegency(regencyId: string): Promise<District[]>;
  export function getDistrictsOfRegencyId(
    regencyId: string
  ): Promise<District[]>;
  export function getDistrictsOfRegencyName(
    regencyName: string
  ): Promise<District[]>;
}
