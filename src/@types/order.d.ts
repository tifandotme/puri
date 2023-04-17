type Qty = {
  base: number;
  bonus?: number;
};

type Cod = {
  type?: "cash" | "transfer";
  amount?: number;
};

type Order<TProduct extends object, TDate = number> = {
  customer: string; // in uid
  qty: Qty;
  product: keyof TProduct; // pass in typeof productList
  additionalInfo: string;
  cod: Cod;
  scheduledTime: number;
  location?: string;
  createdAt: TDate;
};

type OrderList = Record<string, Order>;
