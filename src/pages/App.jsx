import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";

import { auth } from "../config/firebase";
import customTheme from "../config/theme";

import AuthContainer from "./auth/AuthContainer";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./auth/ForgotPassword";

import MainContainer from "./MainContainer";
import AddCustomer from "./customers/AddCustomer";
import OrderList from "./orders/OrderList";

export default function App() {
  const location = useLocation().pathname;
  const [currentUser, setCurrentUser] = useState(null);
  const [fullscreenLoading, setFullscreenLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user.email) : setCurrentUser("");
      setFullscreenLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ChakraProvider theme={customTheme(location, fullscreenLoading)}>
      <Routes>
        <Route
          path="/"
          element={
            <MainContainer
              user={currentUser}
              loading={fullscreenLoading}
              location={location}
            />
          }
        >
          <Route index element={<h1>App</h1>} />
          <Route path="customers" element={<AddCustomer />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route
            path="help"
            element={<h1>Bantuan TODO: dokumentasi lengkap cara penggunaan</h1>}
          />
        </Route>
        <Route
          element={
            <AuthContainer
              user={currentUser}
              loading={fullscreenLoading}
              location={location}
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
