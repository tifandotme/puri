import { Box, CloseButton, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import navLinks from "./sidebarMenuItems";

type SPProps = {
  onClose: () => void;
  currentPath: string;
  display?: Record<"base" | "md", string>;
};

function SidebarPanel({ onClose, currentPath, display }: SPProps) {
  const [appVersion, setAppVersion] = useState("");
  useEffect(() => {
    // is there a better way to get the version without fetching the package.json?
    fetch("https://raw.githubusercontent.com/tifandotme/puri/main/package.json")
      .then((res) => res.json())
      .then((data) => setAppVersion(data.version));
  }, []);

  return (
    <Box
      bg="white"
      borderRight="1px solid"
      borderRightColor="gray.200"
      pos="fixed"
      h="full"
      w={{ base: "full", md: 60 }} // lebar sidebar
      role="group"
      display={display}
    >
      <Flex h="20" mx="8" justify="space-between" align="flex-end" mb={8}>
        <Image src={logo} alt="logo" h="65%" draggable={false} />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          mb={1}
          fontSize={12}
          boxSize={12}
        />
      </Flex>

      {navLinks.map(({ name, path, icon, iconActive }) => {
        let isActive;
        if (path === "/") {
          isActive = currentPath === path;
        } else {
          isActive = currentPath.startsWith(path);
        }

        return (
          <Link to={path} onClick={onClose} key={name} draggable={false}>
            <Flex
              my="1"
              mx="4"
              p="4"
              _hover={{
                bg: "secondary",
                color: "white",
              }}
              transition="all 0.1s"
              borderRadius="3xl"
              align="center"
              userSelect="none"
            >
              <Icon mr="4" as={isActive ? iconActive : icon} boxSize={5} />
              <Text
                as="span"
                lineHeight={4}
                fontWeight={isActive ? "bold" : "normal"}
              >
                {name}
              </Text>
            </Flex>
          </Link>
        );
      })}
      <Text
        color="gray.400"
        fontSize="xs"
        pos="absolute"
        bottom="0"
        mx="4"
        p="4"
        userSelect="none"
      >
        v{appVersion}
      </Text>
    </Box>
  );
}

export default SidebarPanel;
