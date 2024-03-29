import { Stack, VStack } from "@chakra-ui/react";
import {
  MdBarChart,
  MdGroup,
  MdMoreTime,
  MdOutlineTextSnippet,
  MdPersonSearch,
} from "react-icons/md";
import CustomerCount from "./CustomerCount";
import Greeting from "./Greeting";
import LatestOrder from "./LatestOrder";
import OrderCount from "./OrderCount";
import OrderHistory from "./OrderHistory";
import { Panel } from "./Panel";
import UserList from "./UserList";

function HomePage() {
  return (
    <VStack // top to bottom (one column)
      gap="2"
      px="4"
      alignItems="stretch"
      pt="6"
      pb="4"
    >
      <Greeting />

      <Stack // one row
        direction={{ base: "column", lg: "row" }}
        gap="2"
        align="stretch"
      >
        <Panel flexGrow="2" flexBasis="15%" icon={MdMoreTime}>
          <LatestOrder />
        </Panel>
        <Panel flexGrow="0.8" flexBasis="15%" icon={MdOutlineTextSnippet}>
          <OrderCount />
        </Panel>
        <Panel flexGrow="0.8" flexBasis="15%" icon={MdGroup}>
          <CustomerCount />
        </Panel>
      </Stack>

      <Stack // one row
        direction={{ base: "column", lg: "row" }}
        gap="2"
        align="stretch"
      >
        <Panel flexGrow="1.5" flexBasis="24" icon={MdBarChart}>
          <OrderHistory />
        </Panel>
        <Panel flexGrow="1" flexBasis="24" icon={MdPersonSearch}>
          <UserList />
        </Panel>
      </Stack>
    </VStack>
  );
}

export default HomePage;
