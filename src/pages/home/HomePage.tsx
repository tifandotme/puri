import { Stack, VStack } from "@chakra-ui/react";
import { User as UserAuth } from "firebase/auth";
import { onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../config/firebase";
import CustomerCount from "./CustomerCount";
import { Greeting } from "./Greeting";
import LatestOrder from "./LatestOrder";
import OrderCount from "./OrderCount";
import OrderHistory from "./OrderHistory";
import { Panel } from "./Panel";
import UserList from "./UserList";

type HomePageProps = {
  user?: UserAuth;
};

function HomePage({ user: userAuth }: HomePageProps) {
  const [userList, setUserList] = useState<UserList | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userAuth) {
      return;
    }

    const userRef = ref(database, "users");
    const userQuery = query(userRef);

    const unsubscribe = onValue(
      userQuery,
      (snapshot) => {
        if (snapshot.exists()) {
          setUserList(snapshot.val() as UserList);
        }

        setIsLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );

    return unsubscribe;
  }, [userAuth]);

  return (
    <VStack // top to bottom (one column)
      gap="2"
      px="4"
      alignItems="stretch"
      pt="6"
    >
      <Greeting userAuth={userAuth} />

      <Stack // one row
        direction={{ base: "column", lg: "row" }}
        gap="2"
        align="stretch"
      >
        <Panel flexGrow="2" flexBasis="15%">
          <LatestOrder />
        </Panel>
        <Panel flexGrow="0.8" flexBasis="15%">
          <OrderCount />
        </Panel>
        <Panel flexGrow="0.8" flexBasis="15%">
          <CustomerCount />
        </Panel>
      </Stack>

      <Stack // one row
        direction={{ base: "column", lg: "row" }}
        gap="2"
        align="stretch"
      >
        <Panel flexGrow="1.5" flexBasis="24">
          <OrderHistory />
        </Panel>
        <Panel flexGrow="1" flexBasis="24">
          <UserList data={userList}/>
        </Panel>
      </Stack>
    </VStack>
  );
}

export default HomePage;
