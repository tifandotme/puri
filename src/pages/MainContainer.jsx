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
} from "@chakra-ui/react";
import {
  BiHomeAlt,
  BiMenu,
  BiChevronDown,
  BiUser,
  BiReceipt,
} from "react-icons/bi";
import { useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import FullscreenLoading from "./components/FullscreenLoading";
import { auth, database } from "../config/firebase";
import { ref, child, get } from "firebase/database";
import { handleSignOut } from "./auth/handleAuth";

// TODO: include isAllowed prop to check if user is allowed to access the routes
// https://www.robinwieruch.de/react-router-private-routes/

// TODO: add dark mode?

const navLinks = [
  { name: "Home", path: "/", icon: BiHomeAlt },
  { name: "Customers", path: "/customers", icon: BiUser },
  { name: "Orders", path: "/orders", icon: BiReceipt },
];

export default function MainContainer({ user, loading }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (loading) return <FullscreenLoading />;

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Box bg="gray.100" minH="100vh">
      <Sidebar onClose={onClose} display={{ base: "none", md: "block" }} />

      <Header onOpen={onOpen} />

      <Drawer // mobile sidebar using drawer
        placement="left"
        returnFocusOnClose={false}
        size="full"
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <Box border="2px solid red" ml={{ base: 0, md: 60 }} p={4}>
        <Outlet />
      </Box>
    </Box>
  );
}

function Sidebar({ onClose, ...rest }) {
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
      <Flex h="20" mx="8" justify="space-between" align="center">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          PURI
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {navLinks.map((link) => (
        <NavItem
          key={link.name}
          path={link.path}
          icon={link.icon}
          onClose={onClose}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}

function NavItem({ path, icon, onClose, children }) {
  return (
    <Link to={path} onClick={onClose}>
      <Flex
        p="4"
        mx="4"
        _hover={{
          bg: "gray.500",
          color: "white",
        }}
        borderRadius="md"
        align="center"
      >
        {icon && <Icon mr="4" as={icon} boxSize={5} />}
        <Text>{children}</Text>
      </Flex>
    </Link>
  );
}

function Header({ onOpen }) {
  const dbRef = ref(database);
  const [divisi, setDivisi] = useState("");

  get(child(dbRef, `users/${auth.currentUser?.uid}/divisi`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setDivisi(snapshot.val());
        console.log("exists");
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
      height="20"
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
        icon={<BiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        PURI
      </Text>

      <Menu>
        <MenuButton py={2}>
          <HStack spacing={3}>
            <Avatar // TODO: set default avatar and make it possible to upload custom avatar
              size="sm"
              src={
                "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">{auth.currentUser?.displayName}</Text>
              <Text fontSize="xs" color="gray.600">
                {divisi}
              </Text>
            </VStack>
            <Box display={{ base: "none", md: "flex" }}>
              <Icon as={BiChevronDown} boxSize={5} />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList borderColor="gray.200">
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
