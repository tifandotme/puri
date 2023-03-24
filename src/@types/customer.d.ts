type Customer = {
  name: string;
  id: number;
  phone: number;
  phone2?: number;
  address: {
    city: string;
    district: string;
    regency: string;
    street: string;
  };
  type: "individu" | "perusahaan";
  createdAt: number;
  sales: string;
};

type CustomerList = Record<string, Customer>;
