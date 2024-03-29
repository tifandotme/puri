import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { messaging } from "../../config/firebase";
import { FullscreenSpinner } from "../LoadingOverlay";
import HeaderPanel from "./HeaderPanel";
import SidebarPanel from "./SidebarPanel";

type MCProps = {
  user: User | undefined;
  isLoading: boolean;
};

function PanelContainer({ user, isLoading }: MCProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      toast({
        title: payload.notification?.title,
        description: payload.notification?.body,
        status: "info",
      });
    });

    return unsubscribe;
  }, [toast]);
  if (isLoading) return <FullscreenSpinner />;

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Box bg="gray.50" minH="100vh" pb="1px">
      {/* without pb, setting mb on content would mess up the background color */}
      <SidebarPanel
        onClose={onClose}
        zIndex="3"
        display={{ base: "none", md: "block" }}
      />
      <HeaderPanel user={user} onOpen={onOpen} zIndex="3" />
      <Drawer
        placement="left"
        returnFocusOnClose={false}
        size="full"
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerContent>
          <SidebarPanel onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} pt={{ base: 16, md: 20 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default PanelContainer;
