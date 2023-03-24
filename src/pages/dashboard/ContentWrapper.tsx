import { Heading, Stack, Box, Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type CWProps = {
  title: string;
  button?: {
    name: string;
    path: string;
    colorScheme?: string;
    variant?: string;
  }[];
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
            <ButtonGroup spacing={1}>
              {button.map((button) => (
                <Link key={button.path} to={button.path}>
                  <Button
                    colorScheme={button.colorScheme}
                    variant={button.variant}
                  >
                    {button.name}
                  </Button>
                </Link>
              ))}
            </ButtonGroup>
          )}
        </Stack>
      </Box>
      {children}
    </>
  );
}

export default ContentWrapper;
