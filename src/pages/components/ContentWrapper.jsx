import { Heading, HStack, Box, Button } from "@chakra-ui/react";

function ContentWrapper({ children, title }) {
  return (
    <>
      <Box
        bg="white"
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        py="40px"
        pl="20px"
        pr="30px"
      >
        <HStack justify="space-between">
          <Heading size="lg" fontWeight="500">
            {title}
          </Heading>
          <Button>Add Customer</Button>
        </HStack>
      </Box>
      {children}
    </>
  );
}

export default ContentWrapper;
