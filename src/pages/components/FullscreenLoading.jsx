import { Stack, Spinner } from "@chakra-ui/react";

function FullscreenLoading({ loading }) {
  if (loading)
    return (
      <Stack
        alignItems="center"
        height="100vh"
        justifyContent="center"
      >
        <Spinner
          color="red"
          size={{ base: "md", sm: "lg" }}
          thickness="4px"
          speed="0.7s"
        />
      </Stack>
    );
}

export default FullscreenLoading;
