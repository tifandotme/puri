type CustomerAddress = {
  city: string;
  district: string;
  regency: string;
  street: string;
};

type Customer<TDate> = {
  name: string;
  id: number;
  phone: number;
  phone2?: number;
  address: CustomerAddress;
  type: "individu" | "perusahaan";
  createdAt: TDate;
  sales: string; // in uid
};

// TODO: refine this type
type CustomerList = Record<string, Customer<string>>;
