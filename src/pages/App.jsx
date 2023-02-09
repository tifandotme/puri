import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { customTheme } from "../config/theme";
import AuthContainer from "./auth/AuthContainer";
import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { auth } from "../config/firebase";
import { useState, useEffect } from "react";
import AuthGuard from "./AuthGuard";
// import AuthButton from "./components/AuthButton";

function Home() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState("");

  // TODO learn more about this
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("from useEffect: " + user?.email);
      if (user) {
        setCurrentUser(user.email);
      } else {
        setCurrentUser("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ChakraProvider theme={customTheme(location.pathname)}>
      {/* <AuthButton user={currentUser} navigate={navigate} /> */}
      <Routes>
        <Route path="/" element={<AuthGuard user={currentUser} />}>
          <Route index element={<h1>Index</h1>} />
          <Route path="customers" element={<h1>Customers</h1>} />
          <Route path="orders" element={<h1>Orders</h1>} />
          <Route path="profile" element={<h1>Profile</h1>} />
        </Route>
        <Route element={<AuthContainer />}>
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
