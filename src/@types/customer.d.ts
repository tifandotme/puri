type CustomerAddress = {
  city: string;
  district: string;
  regency: string;
  street: string;
};

// serverTimestamp() stored the value as number (default)
// but in handle-add-customer.ts, we need to specify it as object
type Customer<TDate = number> = {
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
type CustomerList = Record<string, Customer>;
