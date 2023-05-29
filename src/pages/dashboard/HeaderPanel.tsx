import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Skeleton,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import {
  HiArrowRightOnRectangle,
  HiBars3,
  HiChevronDown,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { auth } from "../../config/firebase";
import useTopValue from "../../hooks/useTopValue";
import { capitalizeWords } from "../../utils/misc";
import { UserListContext } from "../ContextProviders";
import { handleSignOut } from "../auths/handle-auths";
import EditProfileModal from "./EditProfileModal";
import { NotificationButton } from "./NotificationButton";

type HPProps = {
  user: User | undefined;
  onOpen: () => void;
  [key: string]: any;
};

function HeaderPanel({ user, onOpen, ...props }: HPProps) {
  const { isOpen, onOpen: onOpenProfile, onClose } = useDisclosure();

  const { userList } = useContext(UserListContext);

  const division = capitalizeWords(userList?.[user?.uid ?? ""]?.division ?? "");

  const topValue = useTopValue(16, "md");

  // check if online
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
      {...props}
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
        justify="space-between"
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          fontSize={22}
          icon={<HiBars3 />}
        />
        <Show above="md">
          <NotificationButton />
        </Show>

        <Link to="/">
          <Flex h="16" align="center" display={{ base: "flex", md: "none" }}>
            <Image src={logo} alt="logo" h="50%" draggable={false} />
          </Flex>
        </Link>

        <Menu autoSelect={false}>
          <MenuButton
            py={3}
            mx={-2}
            px={2}
            borderRadius="md"
            _hover={{
              base: {},
              md: {
                bg: "gray.100",
              },
            }}
          >
            <HStack spacing={3}>
              <Avatar
                size="sm"
                m="1"
                pointerEvents="auto"
                boxSize={{ base: "8", md: "10" }}
              >
                <Tooltip
                  hasArrow
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
                <Text fontSize="md">{auth.currentUser?.displayName}</Text>
                <Skeleton isLoaded={division.length !== 0} h={4}>
                  <Text lineHeight="1" fontSize="sm" color="muted">
                    {division || "xxxxxxx"}
                  </Text>
                </Skeleton>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <Icon as={HiChevronDown} boxSize={4} />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList borderColor="gray.200" minW="180px">
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
              {division && (
                <Text fontSize="xs" color="gray.600">
                  {division}
                </Text>
              )}
            </VStack>
            <MenuItem
              onClick={onOpenProfile}
              icon={<HiOutlineUserCircle size={18} />}
            >
              Edit Profile
            </MenuItem>
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

      <EditProfileModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default HeaderPanel;
