import { Heading, Stack, HStack, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type CWProps = {
  title: string;
  button?: {
    name: string;
    path: string;
  };
  children: React.ReactNode;
};

function ContentWrapper({ title, button, children }: CWProps) {
  return (
    <>
      <Box // header
        bg="white"
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        py="40px"
        pl="30px"
        pr="40px"
      >
        <Stack
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          gap={5}
          minH={10}
        >
          <Heading fontSize="2xl" fontWeight="500" my="auto">
            {title}
          </Heading>
          {button && (
            <HStack gap={1} justify="flex-start">
              <Link to={button.path}>
                <Button colorScheme="gray">{button.name}</Button>
              </Link>
            </HStack>
          )}
        </Stack>
      </Box>
      {children}
    </>
  );
}

export default ContentWrapper;
