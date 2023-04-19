type CustomerAddress = {
  city: string;
  district: string;
  regency: string;
  street: string;
};

// serverTimestamp() stored the value as number (default)
// but in handle-add-customer.ts, we need to specify it as object
type Customer<TDate extends object = number> = {
  name: string;
  id: number;
  phone: number;
  phone2?: number;
  address: CustomerAddress;
  type: "individu" | "perusahaan";
  createdAt: TDate;
  sales: string; // in uid
};

type CustomerList = Record<string, Customer>;

type CustomerListContext = {
  customerList: CustomerList | undefined;
  isLoading: boolean;
};
