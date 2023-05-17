import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  AvatarGroup,
  Box,
  BoxProps,
  HStack,
  Heading,
  List,
  ListIcon,
  ListItem,
  Progress,
  Select,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { User as UserAuth } from "firebase/auth";
import { child, get, ref } from "firebase/database";
import { useContext, useEffect, useMemo, useState } from "react";
import { RiPriceTag3Fill } from "react-icons/ri";
import { CustomerListContext, OrderListContext } from "../../App";
import { database } from "../../config/firebase";
import { formatDateTime, formatQtyProduct } from "../../utils/format";
import productList from "../orders/product-list";
import { BsFillPersonLinesFill } from "react-icons/bs";

type HomePageProps = {
  user?: UserAuth;
};

function HomePage({ user: userAuth }: HomePageProps) {
  const { customerList } = useContext(CustomerListContext);
  const { orderList } = useContext(OrderListContext);

  const latestOrder = useMemo(() => {
    if (!orderList) return;

    const sorted = Object.entries(orderList || {}).sort(
      (a, b) => b[1].createdAt - a[1].createdAt
    );

    return sorted[0][1];
  }, [orderList]);

  // const orderHistory = useMemo(() => {
  //   if (!orderList) return;

  //   const allTime: Record<ProductList, number> = {
  //     serbaguna: 0,
  //     masonry: 0,
  //     extrapower: 0,
  //     padang: 0,
  //   };

  //   const lastSevenDays: Record<ProductList, number> = {
  //     serbaguna: 0,
  //     masonry: 0,
  //     extrapower: 0,
  //     padang: 0,
  //   };

  //   Object.values(orderList).forEach((order) => {
  //     allTime[order.product] += order.qty.base + (order.qty.bonus ?? 0);
  //   });

  //   Object.values(orderList)
  //     .filter((order) => {
  //       const now = new Date();
  //       const createdAt = new Date(order.createdAt);

  //       const diffTime = Math.abs(now.getTime() - createdAt.getTime());

  //       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //       return diffDays <= 7;
  //     })
  //     .forEach((order) => {
  //       lastSevenDays[order.product] += order.qty.base + (order.qty.bonus ?? 0);
  //     });

  //   return [allTime, lastSevenDays];
  // }, [orderList]);

  // index 0 = all time, index 1 = last seven days
  const orderHistory = useMemo(() => {
    if (!orderList) return;

    const allTime = Object.values(orderList).reduce(
      (acc, order) => {
        acc[order.product] += order.qty.base + (order.qty.bonus ?? 0);
        return acc;
      },
      {
        serbaguna: 0,
        masonry: 0,
        extrapower: 0,
        padang: 0,
      } as Record<ProductList, number>
    );

    const lastSevenDays = Object.values(orderList)
      .filter((order) => {
        const now = new Date();
        const createdAt = new Date(order.createdAt);

        const diffTime = Math.abs(now.getTime() - createdAt.getTime());

        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays <= 7;
      })
      .reduce(
        (acc, order) => {
          acc[order.product] += order.qty.base + (order.qty.bonus ?? 0);
          return acc;
        },
        {
          serbaguna: 0,
          masonry: 0,
          extrapower: 0,
          padang: 0,
        } as Record<ProductList, number>
      );

    return {
      "all-time": allTime,
      "last-seven-days": lastSevenDays,
    };
  }, [orderList]);

  const [orderHistoryState, setOrderHistoryState] = useState("last-seven-days");

  const iconColor: Record<ProductList, string> = {
    serbaguna: "red.700",
    masonry: "green.700",
    extrapower: "gray.800",
    padang: "blue.700",
  };

  return (
    <VStack // top to bottom (one column)
      gap="2"
      px="4"
      alignItems="stretch"
      pt="6"
    >
      <Greeting userAuth={userAuth} />

      <Stack // one row
        direction={{ base: "column", md: "row" }}
        gap="2"
        justifyContent="center"
        alignItems="stretch"
      >
        <Panel h="160px" flexGrow="2" flexBasis="20%">
          <Stack justifyContent="space-between" h="full">
            <Text fontWeight="bold">Pesanan Terakhir</Text>
            <Stack
              h="20"
              align="flex-start"
              justify="center"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              <Skeleton isLoaded={latestOrder !== undefined} fitContent>
                <Text lineHeight="1" color="muted" fontSize="sm">
                  {latestOrder
                    ? formatDateTime(latestOrder.createdAt, {
                        isIncludeTime: true,
                        isShortDate: true,
                      })
                    : "XXXXXXXXXXX"}
                </Text>
              </Skeleton>
              <Skeleton isLoaded={latestOrder !== undefined} fitContent>
                <Text lineHeight="1" fontWeight="500" fontSize="2xl">
                  {latestOrder ? latestOrder.customer : "XXXXXXXXXXXX"}
                </Text>
              </Skeleton>
              <Skeleton isLoaded={latestOrder !== undefined} fitContent>
                <Text lineHeight="1" color="muted">
                  {latestOrder
                    ? formatQtyProduct(latestOrder.qty, latestOrder.product)
                    : "XXXXXXXXXXXXX"}
                </Text>
              </Skeleton>
            </Stack>
          </Stack>
        </Panel>
        <Panel h="160px" flexGrow="0.8" flexBasis="15%">
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
        <Panel h="160px" flexGrow="0.8" flexBasis="15%">
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

      <Stack // one row
        direction={{ base: "column", md: "row" }}
        gap="2"
        justifyContent="center"
        alignItems="stretch"
      >
        <Panel h="auto" flexGrow="3" flexBasis="24">
          <Stack justify="flex-start" h="full" gap="3">
            <HStack justify="space-between">
              <Text fontWeight="bold">Akumulasi Pembelian</Text>
              <Select
                flexShrink="0"
                size="xs"
                maxW="fit-content"
                variant="filled"
                fontWeight="bold"
                onChange={(e) => setOrderHistoryState(e.target.value)}
              >
                <option value="last-seven-days">7 Hari Terakhir</option>
                <option value="all-time">Semua Waktu</option>
              </Select>
            </HStack>
            <Stack align="flex-start" justify="flex-start" h="full">
              <List spacing={2}>
                {orderHistory
                  ? Object.entries(
                      orderHistory[
                        orderHistoryState as keyof typeof orderHistory
                      ]
                    ).map(([key, value]) => (
                      <ListItem key={key}>
                        <ListIcon
                          as={RiPriceTag3Fill}
                          boxSize="5"
                          color={iconColor[key as ProductList]}
                        />
                        {productList[key as ProductList] + ": " + value} zak
                      </ListItem>
                    ))
                  : Object.keys(productList).map((key, idx) => (
                      <Skeleton key={key} fitContent>
                        <ListItem>
                          {"X".repeat(Math.floor(Math.random() * 6) + 20)}
                        </ListItem>
                      </Skeleton>
                    ))}
              </List>
            </Stack>
          </Stack>
        </Panel>
        <Panel flexGrow="1">
          <Stack justify="flex-start" h="full" gap="3">
            <Text fontWeight="bold">Daftar Pengguna</Text>
            <Stack align="flex-start" justify="flex-end" h="full">
              <List spacing={3}>
                <AvatarGroup size="lg" max={2}>
                  <Avatar bg="blue.400" />
                  <Avatar bg="green.400" />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </AvatarGroup>
                <ListItem>
                  <ListIcon as={BsFillPersonLinesFill} boxSize="5" />
                  <Text
                    fontWeight="600"
                    fontSize="sm"
                    verticalAlign="center"
                    display="inline-block"
                  >
                    Divisi Sales
                  </Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={BsFillPersonLinesFill} boxSize="5" />
                  <Text
                    fontWeight="600"
                    fontSize="sm"
                    verticalAlign="center"
                    display="inline-block"
                  >
                    Divisi Logistik
                  </Text>
                </ListItem>
              </List>
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

function Greeting({ userAuth }: { userAuth?: UserAuth }) {
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
    <Heading
      fontWeight="700"
      fontSize={{ base: "xl", md: "2xl" }}
      letterSpacing="wide"
      lineHeight="1.2"
      ml="5"
      my="2"
    >
      {greeting + ", "}
      <Skeleton display="inline-block" isLoaded={user !== undefined} fitContent>
        {user ? user.firstName + "!" : "XXXXXX"}
      </Skeleton>
    </Heading>
  );
}

export default HomePage;
