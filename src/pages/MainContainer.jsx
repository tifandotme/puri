import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
  Skeleton,
  AvatarBadge,
  Image,
} from "@chakra-ui/react";
import {
  HiOutlineInbox,
  HiInbox,
  HiHome,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiUserGroup,
  HiBars3,
  HiChevronDown,
  HiOutlineCube,
} from "react-icons/hi2";
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import FullscreenLoading from "./components/FullscreenLoading";
import { auth, database } from "../config/firebase";
import { ref, child, get } from "firebase/database";
import { handleSignOut } from "./auth/handleAuth";
import logo from "../assets/logo.png";

// TODO: include isAllowed prop to check if user is allowed to access the routes
// https://www.robinwieruch.de/react-router-private-routes/

// TODO: add dark mode?

const navLinks = [
  {
    name: "Home",
    path: "/",
    icon: HiOutlineHome,
    iconActive: HiHome,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: HiOutlineUserGroup,
    iconActive: HiUserGroup,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: HiOutlineInbox,
    iconActive: HiInbox,
  },
];

export default function MainContainer({ user, loading, location }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (loading) return <FullscreenLoading />;

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Box bg="gray.100" minH="100vh">
      <Sidebar
        onClose={onClose}
        location={location}
        display={{ base: "none", md: "block" }}
      />

      <Header onOpen={onOpen} />

      <Drawer // mobile sidebar using drawer
        placement="left"
        returnFocusOnClose={false}
        size="full"
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerContent>
          <Sidebar onClose={onClose} location={location} />
        </DrawerContent>
      </Drawer>

      <Box ml={{ base: 0, md: 60 }} p={4}>
        <Outlet />
      </Box>
    </Box>
  );
}

function Sidebar({ onClose, location, ...rest }) {
  const [appVersion, setAppVersion] = useState("");
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/tifandotme/puri/main/package.json")
      .then((res) => res.json())
      .then((data) => setAppVersion(data.version));
  }, []);

  return (
    <Box
      bg="white"
      borderRight="1px solid"
      borderRightColor="gray.200"
      boxSizing="content-box" // supaya border nya diluar div
      pos="fixed"
      h="full"
      w={{ base: "full", md: 60 }} // lebar sidebar
      role="group"
      {...rest}
    >
      <Flex h="20" mx="8" justify="space-between" align="flex-end" mb={8}>
        <Image src={logo} alt="logo" h="70%" draggable={false} />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          mb={1}
          fontSize={12}
          boxSize={12}
        />
      </Flex>

      {navLinks.map(({ name, path, icon, iconActive }) => (
        <Link to={path} onClick={onClose} key={name} draggable={false}>
          <Flex
            p="4"
            mx="4"
            _hover={{
              bg: "secondary",
              color: "white",
            }}
            borderRadius="md"
            align="flex-end"
          >
            <Icon
              mr="4"
              as={location === path ? iconActive : icon}
              boxSize={5}
            />
            <Text
              as="span"
              lineHeight={4}
              fontWeight={location === path ? "bold" : "normal"}
            >
              {name}
            </Text>
          </Flex>
        </Link>
      ))}

      <Text color="gray.400" fontSize="xs" pos="absolute" bottom="0" mx="4" p="4">
        v{appVersion}
      </Text>
    </Box>
  );
}

function Header({ onOpen }) {
  const dbRef = ref(database);
  const [divisi, setDivisi] = useState("");

  get(child(dbRef, `users/${auth.currentUser?.uid}/divisi`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setDivisi(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height={{ base: "16", md: "20" }}
      alignItems="center"
      bg="white"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      boxSizing="content-box"
      justify={{ base: "space-between", md: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        fontSize={22}
        icon={<HiBars3 />}
      />

      <Flex h="16" align="center" display={{ base: "flex", md: "none" }}>
        <Image src={logo} alt="logo" h="50%" draggable={false} />
      </Flex>

      <Menu autoSelect={false}>
        <MenuButton py={2}>
          <HStack spacing={3}>
            <Avatar // TODO: set default avatar and make it possible to upload custom avatar
              size="sm"
            >
              <AvatarBadge boxSize={4} bg="green.500" />
            </Avatar>
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing={0.5}
              ml="2"
            >
              <Text fontSize="sm">{auth.currentUser?.displayName}</Text>
              <Text fontSize="xs" color="gray.600">
                {divisi}
              </Text>
            </VStack>
            <Box display={{ base: "none", md: "flex" }}>
              <Icon as={HiChevronDown} boxSize={4} />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList borderColor="gray.200">
          <VStack
            display={{ base: "flex", md: "none" }}
            align="flex-start"
            spacing={0.5}
            mx={2}
            mb={2}
            px={3}
            py={2}
            bg="green.100"
            borderRadius={7}
            cursor="context-menu"
          >
            <Text fontSize="sm">{auth.currentUser?.displayName}</Text>
            <Text fontSize="xs" color="gray.600">
              {divisi}
            </Text>
          </VStack>
          <MenuItem>Edit Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuDivider />
          <MenuItem color="red.600" onClick={handleSignOut}>
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
