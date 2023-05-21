import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Stack,
  useToken,
} from "@chakra-ui/react";
import { renderToString } from "react-dom/server";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

type CWProps = {
  title: string;
  icon?: IconType;
  button?: {
    name: string;
    path: string;
    [key: string]: any;
  }[];
  children: React.ReactNode;
};

function ContentWrapper({ title, icon, button, children }: CWProps) {
  const iconColor = useToken("colors", "gray.100");

  const iconUrl = (icon: IconType): string =>
    `data:image/svg+xml,${encodeURIComponent(
      renderToString(icon({ color: iconColor, size: "220px" }))
    )}`;

  return (
    <>
      <Box // header
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        py="40px"
        px={{ base: "30px", md: "50px" }}
        bgColor="white"
        bgImage={{ base: "none", md: icon ? iconUrl(icon) : "none" }}
        bgPosition="-20px 40%"
        bgRepeat="no-repeat"
        bgSize="250px"
      >
        <Stack
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          gap={5}
          minH={10}
        >
          <Heading fontSize="2xl" fontWeight="600" my="auto">
            {title}
          </Heading>
          {button && (
            <ButtonGroup spacing={1}>
              {button.map((button) => (
                <Link key={button.path} to={button.path}>
                  <Button {...button}>{button.name}</Button>
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
