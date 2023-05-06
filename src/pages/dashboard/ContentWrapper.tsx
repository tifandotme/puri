import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Stack,
  useToken,
} from "@chakra-ui/react";
import { renderToString } from "react-dom/server";
import { MdGroup, MdOutlineTextSnippet } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

type CWProps = {
  title: string;
  button?: {
    name: string;
    path: string;
    [key: string]: any;
  }[];
  children: React.ReactNode;
};

function ContentWrapper({ title, button, children }: CWProps) {
  const location = useLocation().pathname;
  const iconColor = useToken("colors", "secondary.50");
  const iconComponent =
    location === "/orders" ? (
      <MdOutlineTextSnippet color={iconColor} />
    ) : (
      <MdGroup color={iconColor} />
    );
  const svgString = renderToString(iconComponent);
  const svgUrl = `data:image/svg+xml,${encodeURIComponent(svgString)}`;

  return (
    <>
      <Box // header
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        py="40px"
        px={{ base: "30px", md: "50px" }}
        bgColor="white"
        bgImage={{base: "none", md: `${svgUrl}`}}
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
          <Heading fontSize="2xl" fontWeight="500" my="auto">
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
