import { Box, Container, Stack, Heading, Image, Text } from "@chakra-ui/react";
import { Outlet, Navigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import FullscreenLoading from "../FullscreenLoading";

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

  if (loading) return <FullscreenLoading />;

  if (user) {
    return <Navigate to="/" replace />;
  }

  // TODO: add gradient effect logo?
  // TODO: add shadow to logo? https://box-shadow.dev/

  return (
    <Container
      maxW="lg"
      h="100vh"
      pt={10} // top logo
      px={{ base: "4", sm: "8" }}
    >
      <Stack spacing={{ base: "5", sm: "16" }} pb={8}>
        <Stack alignItems="center" spacing={4}>
          <Image
            src={logo}
            alt="logo"
            maxW={{ base: "40%", sm: "45%" }}
            draggable={false}
          />
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color="secondary"
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
      <Stack
        display={{ base: "none", sm: "Flex" }}
        align="center"
        justify="center"
        h={10}
      >
        <a
          href="https://github.com/tifandotme/puri"
          rel="noreferrer"
          target="_blank"
        >
          <Text
            as="span"
            fontSize="sm"
            color="gray.500"
            _hover={{ textDecoration: "underline" }}
          >
            View Source Code
          </Text>
        </a>
      </Stack>
    </Container>
  );
}

export default AuthContainer;
