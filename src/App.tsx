import { ChakraProvider } from "@chakra-ui/react";
import { createContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import customTheme from "./config/theme";
import useCustomerList from "./hooks/useCustomerList";
import useOrderList from "./hooks/useOrderList";
import useUserAuth from "./hooks/useUserAuth";
import AuthContainer from "./pages/auths/AuthContainer";
import ForgotPassword from "./pages/auths/ForgotPassword";
import Login from "./pages/auths/Login";
import SignUp from "./pages/auths/SignUp";
import AddCustomerPage from "./pages/customers/AddCustomerPage";
import CustomerListPage from "./pages/customers/CustomerListPage";
import EditCustomerPage from "./pages/customers/EditCustomerPage";
import MyCustomersPage from "./pages/customers/MyCustomersPage";
import PanelContainer from "./pages/dashboard/PanelContainer";
import HomePage from "./pages/home/HomePage";
import AddOrderPage from "./pages/orders/AddOrderPage";
import EditOrderPage from "./pages/orders/EditOrderPage";
import MyOrdersPage from "./pages/orders/MyOrdersPage";
import OrderListPage from "./pages/orders/OrderListPage";

export const CustomerListContext = createContext<CustomerListContext>({
  customerList: undefined,
  isLoading: true,
});

export const OrderListContext = createContext<OrderListContext>({
  orderList: undefined,
  isLoading: true,
});

function App() {
  const currentPath = useLocation().pathname;

  const { user, isLoading } = useUserAuth();

  return (
    <ChakraProvider theme={customTheme(currentPath, isLoading)}>
      <CustomerListContext.Provider value={useCustomerList(user)}>
        <OrderListContext.Provider value={useOrderList(user)}>
          <Routes>
            <Route
              path="/"
              element={<PanelContainer user={user} isLoading={isLoading} />}
            >
              <Route index element={<HomePage user={user} />} />
              <Route path="customers">
                <Route index element={<CustomerListPage />} />
                <Route path="new" element={<AddCustomerPage />} />
                <Route path="my-customers" element={<MyCustomersPage />} />
                <Route path=":id" element={<EditCustomerPage />} />
              </Route>

              <Route path="orders">
                <Route index element={<OrderListPage />} />
                <Route path="new" element={<AddOrderPage />} />
                <Route path="my-orders" element={<MyOrdersPage />} />
                <Route path=":id" element={<EditOrderPage />} />
              </Route>
              <Route
                path="help"
                element={
                  <h1>Bantuan TODO: dokumentasi lengkap cara penggunaan</h1>
                }
              />
            </Route>
            <Route
              element={
                <AuthContainer
                  user={user}
                  isLoading={isLoading}
                  currentPath={currentPath}
                />
              }
            >
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </OrderListContext.Provider>
      </CustomerListContext.Provider>
    </ChakraProvider>
  );
}

export default App;
