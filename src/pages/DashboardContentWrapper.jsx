import { Heading, Stack, HStack, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function DashboardContentWrapper({ title, children, button }) {
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

export default DashboardContentWrapper;
