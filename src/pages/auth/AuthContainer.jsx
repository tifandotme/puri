import { Box, Container, Stack, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

function AuthContainer({ children }) {
  let authType;
  switch (useLocation().pathname) {
    case "/login":
      authType = "Login";
      break;
    case "/signup":
      authType = "Daftar";
      break;
    case "/forgotpassword":
      authType = "Lupa Password";
      break;
  }

  return (
    <Container
      maxW="lg"
      h="100vh"
      py={{ base: "24", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8" pb={4}>
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "md", md: "lg" }}>
              {authType}
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "16", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          boxShadow={{ base: "none", sm: "lg" }}
          borderRadius={{ base: "none", sm: "xl" }}
          backgroundColor="white"
        >
          {children}
        </Box>
      </Stack>
    </Container>
  );
}

export default AuthContainer;
