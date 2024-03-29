/**
 * Type for product list select form. Used in pages/orders/product-list.ts
 */
type ProductList = "serbaguna" | "masonry" | "extrapower" | "padang";

type Qty = {
  base: number;
  bonus?: number;
};

type Payment = {
  type: "cash" | "transfer";
  amount: number;
};

/**
 * This type reflects the data structure of orders object in the database
 *
 * @typeParam TDate - `object` when writing to database with serverTimestamp(), defaults to `number` when reading from database
 * @property customer - in uid. Need to be converted into name when reading from the database
 */
type Order<TDate extends object = number> = {
  customer: string;
  qty: Qty;
  product: ProductList;
  additionalInfo?: string;
  payment?: Payment;
  scheduledTime?: number;
  location?: string;
  createdAt: TDate;
  sales: string;
  isDelivered: boolean;
};

/**
 * Type for react-hook-form's useForm() as FieldValues on Add Order Page
 */
type AddOrderForm = Omit<
  {
    [K in keyof Order]: K extends "customer"
      ? { value: string; label: string }
      : Order[K];
  },
  "createdAt" | "sales"
>;

/**
 * Type for react-hook-form's useForm() as FieldValues on Edit Order Page
 */
type EditOrderForm = Omit<Order, "customer" | "createdAt" | "sales">;

type OrderList = Record<string, Order>;
