import { Routes, Route, Link } from "react-router-dom";
import { ChakraProvider, extendTheme, HStack, Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./auth/ForgotPassword";

function Home() {
  // pake colorScheme, contoh di Button, untuk pake warna brand

  let customTheme;
  switch (useLocation().pathname) {
    case "/login":
    case "/signup":
    case "/forgotpassword": {
      customTheme = extendTheme({
        styles: {
          global: {
            body: {
              bgImage: { base: "null", sm: "url('/assets/background.webp')" },
              bgRepeat: "no-repeat",
              bgSize: "cover",
              bgPosition: "center",
              bgAttachment: "fixed",
              // bgPosition: "top",
              // overflow: "scroll"
            },
          },
        },
      });
      break;
    }
    default: {
      customTheme = extendTheme({
        colors: {
          brand: {
            50: "#FDE8E8",
            100: "#F9BEBE",
            200: "#F59494",
            300: "#F16A6A",
            400: "#ED4040",
            500: "#E81717",
            600: "#BA1212",
            700: "#8B0E0E",
            800: "#5D0909",
            900: "#2E0505",
          },
        },
      });
    }
  }
  return (
    <ChakraProvider theme={customTheme}>
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
        </HStack>

      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </ChakraProvider>
  );
}

export default Home;
