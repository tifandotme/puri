import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";

import { User } from "firebase/auth";
import { auth } from "./config/firebase";
import customTheme from "./config/theme";

import AuthContainer from "./pages/auths/AuthContainer";
import Login from "./pages/auths/Login";
import SignUp from "./pages/auths/SignUp";
import ForgotPassword from "./pages/auths/ForgotPassword";

import MainContainer from "./pages/dashboard/PanelContainer";
import AddCustomer from "./pages/customers/AddCustomer";
import OrderList from "./pages/orders/OrderList";
import CustomerList from "./pages/customers/CustomerList";
import Home from "./pages/home/Home";

function App() {
  const currentPath = useLocation().pathname;

  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [isPageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const authState = auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : setCurrentUser(undefined);

      setPageLoading(false);
    });

    return () => authState();
  }, []);

  return (
    <ChakraProvider theme={customTheme(currentPath, isPageLoading)}>
      <Routes>
        <Route
          path="/"
          element={
            <MainContainer
              currentUser={currentUser}
              isPageLoading={isPageLoading}
              currentPath={currentPath}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path="new" element={<AddCustomer />} />
          </Route>

          <Route path="orders" element={<OrderList />} />
          <Route
            path="help"
            element={<h1>Bantuan TODO: dokumentasi lengkap cara penggunaan</h1>}
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
    </ChakraProvider>
  );
}

export default App;
