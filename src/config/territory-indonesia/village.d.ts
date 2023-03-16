declare module "territory-indonesia" {
  type Village = {
    name: string;
    id: string;
    district_id: string;
    latitude: number | null;
    longitude: number | null;
  };

  export function getAllVillages(): Promise<Village[]>;
  export function getVillageById(id: string): Promise<Village>;
  export function getVillageByName(name: string): Promise<Village>;
  export function getVillagesOfDistrict(districtId: string): Promise<Village[]>;
  export function getVillagesOfDistrictId(
    districtId: string
  ): Promise<Village[]>;
  export function getVillagesOfDistrictName(
    districtName: string
  ): Promise<Village[]>;
}
