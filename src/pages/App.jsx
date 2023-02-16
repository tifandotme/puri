import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { customTheme } from "../config/theme";
import AuthContainer from "./auth/AuthContainer";
import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { auth } from "../config/firebase";
import { useState, useEffect } from "react";
import MainContainer from "./MainContainer";
import Customers from "./customers/Customers";

function Home() {
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
          <Route index element={<h1>Home</h1>} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<h1>orders</h1>} />
          <Route path="profile" element={<h1>Profile</h1>} />
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

export default Home;
