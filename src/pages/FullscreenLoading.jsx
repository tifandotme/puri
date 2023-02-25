import { Stack, Spinner } from "@chakra-ui/react";

function FullscreenLoading() {
  return (
    <Stack alignItems="center" height="100vh" justifyContent="center">
      <Spinner
        color="red.400"
        emptyColor="red.100"
        size={{ base: "md", sm: "lg" }}
        thickness="4px"
        speed="0.7s" />
    </Stack>
  );
}

export default FullscreenLoading;
