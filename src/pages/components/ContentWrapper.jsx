import { Heading, HStack, Box, Button } from "@chakra-ui/react";

function ContentWrapper({ children, title }) {
  return (
    <>
      <Box // header
        bg="white"
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        py="40px"
        pl="30px"
        pr="50px"
      >
        <HStack justify="space-between">
          <Heading fontSize="1.5em" fontWeight="500">
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
