import { createContext } from "react";

export const CustomerListContext = createContext<{
  customerList: CustomerList | undefined;
  isLoading: boolean;
}>({
  customerList: undefined,
  isLoading: true,
});

export const OrderListContext = createContext<{
  orderList: OrderList | undefined;
  isLoading: boolean;
}>({
  orderList: undefined,
  isLoading: true,
});

// we don't need isLoading because /users node is never going to be empty
// so, to get the loading state, just null check the userList
export const UserListContext = createContext<{
  userList: UserList | undefined;
}>({
  userList: undefined,
});
