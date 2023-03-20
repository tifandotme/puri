type Customer = {
  createdAt: number;
  address: {
    city: string;
    district: string;
    regency: string;
    street: string;
  };
  id: number;
  name: string;
  phone: number;
  phone2?: number;
  type: "individu" | "perusahaan";
};

type CustomerList = Record<string, Customer>;
