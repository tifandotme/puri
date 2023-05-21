import { Spinner, Stack } from "@chakra-ui/react";

function FullscreenSpinner() {
  return (
    <Stack alignItems="center" height="100vh" justifyContent="center">
      <Spinner
        color="red.400"
        emptyColor="red.100"
        size={{ base: "md", sm: "lg" }}
        thickness="4px"
        speed="0.7s"
      />
    </Stack>
  );
}

function ContentSpinner() {
  return (
    <Stack
      alignItems="center"
      height="calc(100vh - 300px)"
      justifyContent="center"
    >
      <Spinner
        color="red.400"
        emptyColor="red.100"
        size="md"
        thickness="4px"
        speed="0.7s"
      />
    </Stack>
  );
}

export { FullscreenSpinner, ContentSpinner };
