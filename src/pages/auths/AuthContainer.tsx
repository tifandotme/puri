import { Box, Container, Stack, Heading, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Outlet, Navigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import FullscreenLoading from "../FullscreenLoading";

type ACProps = {
  currentUser: User | undefined;
  isPageLoading: boolean;
  currentPath: string;
};

function AuthContainer({ currentUser, isPageLoading, currentPath }: ACProps) {

  const titleMap: Record<string, string> = {
    "/login": "Login",
    "/signup": "Daftar",
    "/forgotpassword": "Lupa Password",
  };
  const pageTitle = titleMap[currentPath];

  // scroll to top when path changes
  if (currentPath) {
    window.scrollTo(0, 0);
  }

  // TODO: add gradient effect logo?
  // TODO: add shadow to logo? https://box-shadow.dev/

  if (isPageLoading) return <FullscreenLoading />;

  if (currentUser) return <Navigate to="/" replace />;

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
            {pageTitle}
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
