import { Box, Container, Stack, Heading, Image, Text } from "@chakra-ui/react";
import { Outlet, Navigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import FullscreenLoading from "../components/FullscreenLoading";

function AuthContainer({ user, loading, location }) {
  let authTitle;
  switch (location) {
    case "/login":
      window.scrollTo(0, 0);
      authTitle = "Login";
      break;
    case "/signup":
      window.scrollTo(0, 0);
      authTitle = "Daftar";
      break;
    case "/forgotpassword":
      window.scrollTo(0, 0);
      authTitle = "Lupa Password";
      break;
  }

  if (loading) return <FullscreenLoading loading={loading} />;

  if (user) {
    return <Navigate to="/" replace />;
  }

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
