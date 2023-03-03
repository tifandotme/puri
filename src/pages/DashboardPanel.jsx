import {
  Avatar,
  AvatarBadge,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsQuestionCircle, BsQuestionCircleFill } from "react-icons/bs";
import {
  HiArrowRightOnRectangle,
  HiBars3,
  HiChevronDown,
  HiHome,
  HiInbox,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineInbox,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiUserGroup,
} from "react-icons/hi2";
import { Link, Navigate, Outlet } from "react-router-dom";

import logo from "../assets/logo.png";
import { auth } from "../config/firebase";
import useDivision from "../hooks/useDivision";
import useTopValue from "../hooks/useTopValue";
import { handleSignOut } from "./auth/handleAuth";
import FullscreenLoading from "./FullscreenLoading";

// TODO: include isAllowed prop to check if user is allowed to access the routes
// https://www.robinwieruch.de/react-router-private-routes/

// TODO: add dark mode?

const navLinks = [
  {
    name: "Beranda",
    path: "/",
    icon: HiOutlineHome,
    iconActive: HiHome,
  },
  {
    name: "Pelanggan",
    path: "/customers",
    icon: HiOutlineUserGroup,
    iconActive: HiUserGroup,
  },
  {
    name: "Pesanan",
    path: "/orders",
    icon: HiOutlineInbox,
    iconActive: HiInbox,
  },
  {
    name: "Bantuan",
    path: "/help",
    icon: BsQuestionCircle,
    iconActive: BsQuestionCircleFill,
  },
];

function MainContainer({ user, loading, location }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (loading) return <FullscreenLoading />;

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Box bg="gray.50" minH="100vh" pb="1px">
      {/* without pb, setting mb on content would mess up the background color */}
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
      <Box ml={{ base: 0, md: 60 }} pt={{ base: 16, md: 20 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

function Sidebar({ onClose, location, ...rest }) {
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
      {...rest}
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
          isActive = location === path;
        } else {
          isActive = location.startsWith(path);
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

function Header({ onOpen }) {
  const division = useDivision();
  const topValue = useTopValue(16, "md");

  // check if user is online
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, []);

  return (
    <Box
      pos="fixed"
      transition="top 0.3s linear"
      zIndex="sticky"
      w="full"
      top={topValue}
    >
      <Flex
        overflow="hidden"
        height={{ base: "16", md: "20" }}
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        alignItems="center"
        bg="white"
        borderBottom="1px solid"
        borderBottomColor="gray.200"
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
          <MenuButton
            py={3}
            mx={-2}
            px={2}
            borderRadius="xl"
            _hover={{
              base: null,
              md: {
                bg: "gray.100",
              },
            }}
            _active={{
              base: null,
              md: {
                bg: "gray.100",
              },
            }}
          >
            <HStack spacing={3}>
              <Avatar
                // TODO: make it possible to upload custom avatar
                size="sm"
                m="1"
                pointerEvents="auto"
              >
                <Tooltip
                  hasArrow
                  openDelay={250}
                  label={isOnline ? "Online" : "Tidak ada koneksi internet"}
                  fontSize="sm"
                  bg="gray.600"
                >
                  <AvatarBadge
                    boxSize={4}
                    bg={isOnline ? "green.500" : "red.500"}
                  />
                </Tooltip>
              </Avatar>
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing={0.5}
                ml="2"
              >
                <Text fontSize="sm">{auth.currentUser?.displayName}</Text>
                <Skeleton isLoaded={division} h={4}>
                  <Text fontSize="xs" color="gray.600">
                    {division ?? "xxxxxxx"}
                  </Text>
                </Skeleton>
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
              boxShadow="rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset"
              borderRadius={7}
              userSelect="none"
              cursor="not-allowed"
            >
              <Text fontSize="sm">{auth.currentUser?.displayName}</Text>
              <Text fontSize="xs" color="gray.600">
                {division}
              </Text>
            </VStack>
            <MenuItem icon={<HiOutlineUserCircle size={18} />}>
              Edit Profile
            </MenuItem>
            <MenuItem icon={<HiOutlineCog6Tooth size={18} />}>
              Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem
              color="red.600"
              onClick={handleSignOut}
              icon={<HiArrowRightOnRectangle size={18} />}
            >
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}

export default MainContainer;
