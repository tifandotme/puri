type ProductList = "serbaguna" | "masonry" | "extrapower" | "padang";

type Qty = {
  base: number;
  bonus?: number;
};

type Cod = {
  type?: "cash" | "transfer";
  amount?: number;
};

type Order<TDate extends object = number> = {
  customer: string; // in uid
  qty: Qty;
  product: ProductList;
  additionalInfo?: string;
  cod: Cod;
  scheduledTime?: number;
  location?: string;
  createdAt: TDate;
};

type OrderList = Record<string, Order>;

type OrderListContext = {
  orderList: OrderList | undefined;
  isLoading: boolean;
};
