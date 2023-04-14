import { useState, useEffect, createContext } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";

import { User } from "firebase/auth";
import { auth } from "./config/firebase";
import customTheme from "./config/theme";

import AuthContainer from "./pages/auths/AuthContainer";
import Login from "./pages/auths/Login";
import SignUp from "./pages/auths/SignUp";
import ForgotPassword from "./pages/auths/ForgotPassword";

import PanelContainer from "./pages/dashboard/PanelContainer";
import AddCustomer from "./pages/customers/AddCustomer";
import OrderListPage from "./pages/orders/OrderListPage";
import CustomerList from "./pages/customers/CustomerList";
import Home from "./pages/home/Home";
import useCustomerList from "./hooks/useCustomerList";
import EditCustomer from "./pages/customers/EditCustomer";
import AddOrderPage from "./pages/orders/AddOrderPage";

type APType = {
  customerList: CustomerList | undefined;
  isLoading: boolean;
};

export const AppContext = createContext<APType>({
  customerList: undefined,
  isLoading: true,
});

function App() {
  const currentPath = useLocation().pathname;

  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [isPageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user ? user : undefined);
      setPageLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <ChakraProvider theme={customTheme(currentPath, isPageLoading)}>
      <AppContext.Provider value={useCustomerList(currentUser)}>
        <Routes>
          <Route
            path="/"
            element={
              <PanelContainer
                currentUser={currentUser}
                isPageLoading={isPageLoading}
              />
            }
          >
            <Route index element={<Home />} />
            <Route path="customers">
              <Route index element={<CustomerList />} />
              <Route path="new" element={<AddCustomer />} />
              <Route path="edit" element={<EditCustomer />} />
            </Route>

            <Route path="orders">
              <Route index element={<OrderListPage />} />
              <Route path="new" element={<AddOrderPage />} />
              {/* <Route path="edit" element={<EditOrder />} /> */}
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
                currentUser={currentUser}
                isPageLoading={isPageLoading}
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
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default App;
