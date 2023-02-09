import { Box, Container, Stack, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import logo from "../../assets/logo.svg";

function AuthContainer() {
  const [authTitle, setAuthTitle] = useState("");
  const location = useLocation().pathname;

  useEffect(() => {
    switch (location) {
      case "/login":
        window.scrollTo(0, 0);
        setAuthTitle("Login");
        break;
      case "/signup":
        window.scrollTo(0, 0);
        setAuthTitle("Daftar");
        break;
      case "/forgotpassword":
        window.scrollTo(0, 0);
        setAuthTitle("Lupa Password");
        break;
    }
  }, [location]);

  return (
    <Container
      maxW="lg"
      h="100vh"
      pt={10} // top logo
      px={{ base: "4", sm: "8" }}
    >
      <Stack spacing={{ base: "5", sm: "20" }} pb={70}>
        <Stack alignItems="center" spacing={4}>
          <Image src={logo} alt="logo" maxW={{ base: "60%", sm: "70%" }} />
          <Text
            fontSize={{ base: "md", sm: "lg" }}
            color="gray.500"
            fontWeight="bold"
          >
            Order Management System
          </Text>
        </Stack>
        <Box
          py={{ base: "6", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          boxShadow={{ base: "none", sm: "lg" }}
          borderRadius={{ base: "none", sm: "xl" }}
          backgroundColor="white"
        >
          <Heading textAlign="center" pb={12} size="md">
            {authTitle}
          </Heading>
          <Outlet />
        </Box>
      </Stack>
    </Container>
  );
}

export default AuthContainer;
