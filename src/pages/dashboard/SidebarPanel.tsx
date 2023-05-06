import { Box, CloseButton, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import navItems from "./sidebar-nav-items";

type SPProps = {
  onClose: () => void;
  [key: string]: any;
};

function SidebarPanel({ onClose, ...props }: SPProps) {
  // const [appVersion, setAppVersion] = useState("");
  // useEffect(() => {
  //   fetch("https://raw.githubusercontent.com/tifandotme/puri/main/package.json")
  //     .then((res) => res.json() as Promise<{ version: string }>)
  //     .then((data) => {
  //       setAppVersion(data.version);
  //     });
  // }, []);

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
                  bg: "secondary.500",
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
