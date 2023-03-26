type CustomerAddress = {
  city: string;
  district: string;
  regency: string;
  street: string;
};

type Customer = {
  name: string;
  id: number;
  phone: number;
  phone2?: number;
  address: CustomerAddress;
  type: "individu" | "perusahaan";
  createdAt: number;
  sales: string;
};

type CustomerList = Record<string, Customer>;
