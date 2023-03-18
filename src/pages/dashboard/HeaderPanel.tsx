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
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  HiArrowRightOnRectangle,
  HiBars3,
  HiChevronDown,
  HiOutlineCog6Tooth,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import logo from "../../assets/logo.png";
import { auth } from "../../config/firebase";
import useDivision from "../../hooks/useDivision";
import useTopValue from "../../hooks/useTopValue";
import { handleSignOut } from "../auths/handle-auths";

type HPProps = {
  onOpen: () => void;
};

function HeaderPanel({ onOpen }: HPProps) {
  // custom hooks
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
              base: {},
              md: {
                bg: "gray.50",
              },
            }}
            _active={{
              base: {},
              md: {
                bg: "gray.50",
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
                <Skeleton isLoaded={division.length !== 0} h={4}>
                  <Text fontSize="xs" color="gray.600">
                    {division || "xxxxxxx"}
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
              {division && (
              <Text fontSize="xs" color="gray.600">
                {division}
              </Text>
                
)}
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

export default HeaderPanel;
