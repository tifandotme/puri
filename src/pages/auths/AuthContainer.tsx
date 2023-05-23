import { Box, Container, Image, Stack, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FullscreenSpinner } from "../LoadingOverlay";

type ACProps = {
  user: User | undefined;
  isLoading: boolean;
  currentPath: string;
};

function AuthContainer({ user, isLoading, currentPath }: ACProps) {
  // scroll to top when path changes
  if (currentPath) {
    window.scrollTo(0, 0);
  }

  if (isLoading) return <FullscreenSpinner />;

  if (user) return <Navigate to="/" replace />;

  return (
    <Container
      maxW="lg"
      h="100vh"
      pt="3" // top logo
      px={{ base: "4", sm: "8" }}
    >
      <Stack spacing={{ base: "5", sm: "8" }} pb="5">
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
          bg="white"
          textAlign="right"
        >
          <Outlet />
        </Box>
      </Stack>
    </Container>
  );
}

export default AuthContainer;
