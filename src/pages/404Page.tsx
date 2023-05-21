import { Image, Stack, Text } from "@chakra-ui/react";
import john from "../assets/404.gif";

function NotFoundPage() {
  return (
    <Stack minH="100vh" align="center" justify="center">
      <Text
        fontSize={{ base: "1.2em", md: "1.5em" }}
        fontWeight="700"
        color="gray.700"
        mb="10"
      >
        Oops, halaman tidak ditemukan
      </Text>
      <Image
        src={john}
        alt="404"
        h={{ base: "200px", md: "300px" }}
      />
    </Stack>
  );
}

export default NotFoundPage;
