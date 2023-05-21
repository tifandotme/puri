import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { FullscreenSpinner } from "../LoadingOverlay";
import HeaderPanel from "./HeaderPanel";
import SidebarPanel from "./SidebarPanel";

// TODO: include isAllowed prop to check if user is allowed to access the routes
// https://www.robinwieruch.de/react-router-private-routes/

type MCProps = {
  user: User | undefined;
  isLoading: boolean;
};

function PanelContainer({ user, isLoading }: MCProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <HeaderPanel onOpen={onOpen} zIndex="3" />
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
