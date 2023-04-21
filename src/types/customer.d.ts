/**
 * Type for CustomerTypeRadio options
 */
type CustomerType = "individu" | "perusahaan";

type CustomerAddress = {
  city: string;
  district: string;
  regency: string;
  street: string;
};

/**
 * This type reflects the data structure of customers object in the database
 *
 * @typeParam TDate - `object` when writing to database with serverTimestamp(), defaults to `number` when reading from database
 * @property sales - in uid. Need to be converted into name when reading from the database
 */
type Customer<TDate extends object = number> = {
  name: string;
  id: number;
  phone: number;
  phone2?: number;
  address: CustomerAddress;
  type: CustomerType;
  createdAt: TDate;
  sales: string;
};

/**
 * Type for react-hook-form's useForm() as FieldValues
 */
type CustomerForm = Omit<
  { prefixName: string } & Customer,
  "createdAt" | "sales"
>;

type CustomerList = Record<string, Customer>;

/**
 * Type for CustomerList context provider
 */
type CustomerListContext = {
  customerList?: CustomerList;
  isLoading: boolean;
};
