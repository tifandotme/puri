/**
 * Type for CustomerTypeRadio options
 */
type CustomerType = "individu" | "perusahaan";

/**
 * @property regency - kota/kabupaten
 * @property district - kecamatan
 * @property village - kelurahan
 * @property street - jalan
 */
type CustomerAddress = {
  regency: string;
  district: string;
  village: string;
  street: string;
};

/**
 * This type reflects the data structure of customers object in the database
 *
 * @typeParam TDate - `object` when writing to database with serverTimestamp(), defaults to `number` when reading from database
 * @property id - No KTP for individu, No NPWP for perusahaan
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
 * Type for react-hook-form's useForm() as FieldValues on Add Customer Page
 */
type AddCustomerForm = Omit<
  { prefixName: string } & Customer,
  "createdAt" | "sales"
>;

/**
 * Type for react-hook-form's useForm() as FieldValues on Edit Customer Page
 */
type EditCustomerForm = Omit<Customer, "type" | "createdAt" | "sales">;

type CustomerList = Record<string, Customer & { salesName: string }>;
