import {
  Box,
  BoxProps,
  Skeleton,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { User as UserAuth } from "firebase/auth";
import { child, get, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { CustomerListContext, OrderListContext } from "../../App";
import { database } from "../../config/firebase";

import "@fontsource/raleway/400.css"

type HomeProps = {
  user?: UserAuth;
};

function Home({ user: userAuth }: HomeProps) {
  const { customerList } = useContext(CustomerListContext);
  const { orderList } = useContext(OrderListContext);

  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    if (!userAuth) return;

    get(child(ref(database, "users"), `${userAuth.uid}`)).then((snapshot) => {
      setUser(snapshot.val() as User);
    });
  }, [userAuth]);

  const hour = new Date().getHours();
  let greeting: string;
  if (hour >= 5 && hour < 12) {
    greeting = "Selamat Pagi";
  } else if (hour >= 12 && hour < 15) {
    greeting = "Selamat Siang";
  } else if (hour >= 15 && hour < 18) {
    greeting = "Selamat Sore";
  } else {
    greeting = "Selamat Malam";
  }

  return (
    <VStack // top to bottom (one column)
      gap="2"
      px="4"
      alignItems="stretch"
      pt="6"
    >
      <Text
        fontFamily="RalewayVariable, sans-serif"
        fontWeight="700"
        fontSize="3xl"
        letterSpacing="wide"
        lineHeight="1.6"
      >
        {greeting + ", "}
        <Skeleton
          display="inline-block"
          isLoaded={user !== undefined}
          fitContent
        >
          {user ? user.firstName + "!" : "XXXXXXX"}
        </Skeleton>
      </Text>
      <Stack // one row
        direction={{ base: "column", md: "row" }}
        gap="2"
        justifyContent="center"
        alignItems="stretch"
      >
        <Panel flexGrow="2" overflow="hidden" whiteSpace="nowrap">
          <Stack justifyContent="space-between" h="full">
            <Text fontWeight="bold">Pesanan Terakhir</Text>
            <Stack h="20" align="flex-start" justify="center">
              <Text lineHeight="1" color="muted" fontSize="sm">
                20/2/2022 22:00
              </Text>
              <Text lineHeight="1" fontWeight="500" fontSize="2xl">
                Kandang Kebo, TB
              </Text>
              <Text lineHeight="1" color="muted">
                200+2 Padang
              </Text>
            </Stack>
          </Stack>
        </Panel>
        <Panel flexGrow="1">
          <Stack justifyContent="space-between" h="full">
            <Text fontWeight="bold">Jumlah Pelanggan</Text>
            <Stack h="16" align="flex-start" justify="center">
              <Skeleton isLoaded={customerList !== undefined} fitContent>
                <Text fontWeight="300" fontSize="5xl" lineHeight="1">
                  {customerList ? Object.keys(customerList).length : "XX"}
                </Text>
              </Skeleton>
            </Stack>
          </Stack>
        </Panel>
        <Panel flexGrow="1">
          <Stack justifyContent="space-between" h="full">
            <Text fontWeight="bold">Jumlah Pesanan</Text>
            <Stack h="16" align="flex-start" justify="center">
              <Skeleton isLoaded={orderList !== undefined} fitContent>
                <Text fontWeight="300" fontSize="5xl" lineHeight="1">
                  {orderList ? Object.keys(orderList).length : "XX"}
                </Text>
              </Skeleton>
            </Stack>
          </Stack>
        </Panel>
      </Stack>
    </VStack>
  );
}

type PanelProps = {
  children: React.ReactNode;
} & BoxProps;

function Panel({ children, ...props }: PanelProps) {
  return (
    <Box
      h="160px"
      p="5"
      borderRadius="10"
      borderWidth="1px"
      borderColor="gray.200"
      bg="white"
      {...props}
    >
      {children}
    </Box>
  );
}

export default Home;
