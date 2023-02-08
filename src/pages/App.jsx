import { ChakraProvider, Button, HStack, VStack, Text } from "@chakra-ui/react";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { auth } from "../config/firebase";
import { customTheme } from "../config/theme";
import { handleSignOut } from "./firebaseAuthOperations";

function Home() {
  return (
    <ChakraProvider theme={customTheme(useLocation().pathname)}>
      <VStack>
        <HStack m={3} justifyContent="center">
          <Link to="/">
            <Button colorScheme="messenger">Home</Button>
          </Link>
          <Link to="/login">
            <Button colorScheme="green">Login</Button>
          </Link>
          <Link to="/signup">
            <Button colorScheme="red">Sign up</Button>
          </Link>
          <Button onClick={handleSignOut} variant="outline" colorScheme="blue">
            Sign Out
          </Button>
        </HStack>
        <Text>User: {auth.currentUser?.email}</Text>
      </VStack>
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
