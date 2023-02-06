import { ChakraProvider, Button } from "@chakra-ui/react";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { customTheme } from "../config/theme";

function Home() {
  const onSignOut = () => {
    signOut(auth)
      .then(alert("signout sukses"))
      .catch((error) => alert(error));
  };

  return (
    <ChakraProvider theme={customTheme(useLocation().pathname)}>
      {/* <HStack m={3} justifyContent="center">
          <Link to="/">
            <Button colorScheme="messenger">Home</Button>
          </Link>
          <Link to="/login">
            <Button colorScheme="green">Login</Button>
          </Link>
          <Link to="/signup">
            <Button colorScheme="red">Sign up</Button>
          </Link>
        </HStack> */}
      <Button onClick={onSignOut} variant="outline" colorScheme="blue">
        Sign Out
      </Button>

      <p>User: {auth.currentUser?.email}</p>

      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </ChakraProvider>
  );
}
export default Home;
