import {
  Box,
  CloseButton,
  Flex,
  Hide,
  Icon,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { NotificationButton } from "./NotificationButton";
import navItems from "./sidebar-nav-items";

type SPProps = {
  onClose: () => void;
  [key: string]: any;
};

function SidebarPanel({ onClose, ...props }: SPProps) {
  const appVersion = "1.0.0";

  return (
    <Box
      bg="white"
      borderRight="1px solid"
      borderRightColor="gray.200"
      pos="fixed"
      h="full"
      w={{ base: "full", md: 60 }} // lebar sidebar
      role="group"
      {...props}
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

      {navItems.map(({ name, path, icon, iconActive }) => {
        // was using <Link> and just realized react-router provide <NavLink> to handle active link
        // gonna leave this here as a reminder to read the docs more carefully
        //
        // let isActive;
        // if (path === "/") {
        //   isActive = currentPath === path;
        // } else {
        //   isActive = currentPath.startsWith(path);
        // }
        return (
          <NavLink to={path} onClick={onClose} key={name} draggable={false}>
            {({ isActive }) => (
              <Flex
                my="1"
                mx="4"
                p="4"
                _hover={{
                  bg: "linear-gradient(180deg,hsl(203deg 40% 45%) 0%,hsl(203deg 35% 50%) 50%,hsl(203deg 39% 56%) 100%)",
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
            )}
          </NavLink>
        );
      })}

      <Hide above="md">
        <NotificationButton position="absolute" bottom="120" left="15" />
      </Hide>

      <Link
        href="https://github.com/tifandotme/puri"
        target="_blank"
        draggable={false}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Stack
          align="center"
          bg="yellow.100"
          color="yellow.700"
          _hover={{
            color: "yellow.800",
            borderColor: "yellow.400",
          }}
          borderColor="yellow.300"
          borderWidth="1px"
          borderRadius="md"
          mx="4"
          p="2"
          position="absolute"
          bottom="16"
          userSelect="none"
          direction="row"
          maxW="full"
        >
          <Icon as={FaGithub} boxSize={6} />
          <Text fontSize="xs">This project is open-source on GitHub</Text>
          <Icon
            as={HiExternalLink}
            boxSize={4}
            position="relative"
            color="yellow.500"
            alignSelf={{ base: "center", md: "flex-start" }}
          />
        </Stack>
      </Link>
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
