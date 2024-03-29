import {
  HStack,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useMemo, useState } from "react";
import { RiPriceTag3Fill } from "react-icons/ri";
import { OrderListContext } from "../ContextProviders";
import productList from "../orders/product-list";
import { Ellipsis } from "./Panel";

function OrderHistory() {
  const { orderList, isLoading } = useContext(OrderListContext);

  const options = {
    "last-seven-days": "7 hari terakhir",
    "all-time": "Semua waktu",
  } as const;

  const [chosenOption, setOption] =
    useState<keyof typeof options>("last-seven-days");

  const orderHistory = useMemo(() => {
    const initialValue: Record<ProductList, number> = {
      serbaguna: 0,
      masonry: 0,
      extrapower: 0,
      padang: 0,
    };

    if (!orderList) {
      return {
        "all-time": initialValue,
        "last-seven-days": initialValue,
      };
    }

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
      }
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
        }
      );

    return {
      "all-time": allTime,
      "last-seven-days": lastSevenDays,
    };
  }, [orderList]);

  const iconColor: Record<ProductList, string> = {
    serbaguna: "red.700",
    masonry: "green.700",
    extrapower: "gray.800",
    padang: "blue.700",
  };

  return (
    <Stack justify="space-between" h="full">
      <HStack justify="space-between" align="flex-start">
        <Text fontWeight="bold">Akumulasi Pembelian</Text>
        <Ellipsis
          options={options}
          defaultValue={chosenOption}
          setState={setOption}
        />
      </HStack>
      <Stack
        h="32"
        justify="flex-end"
        align="flex-start"
        overflow="hidden"
        whiteSpace="nowrap"
        transition="all 0.2s ease-in-out"
      >
        <List spacing={2}>
          {!isLoading
            ? Object.entries(orderHistory[chosenOption]).map(([key, value]) => (
                <ListItem key={key}>
                  <ListIcon
                    as={RiPriceTag3Fill}
                    boxSize="5"
                    color={iconColor[key as ProductList]}
                  />
                  {productList[key as ProductList] + ": "}{" "}
                  <Text as="span" fontWeight="500">
                    {value} zak
                  </Text>
                </ListItem>
              ))
            : Object.keys(productList).map((key) => (
                <Skeleton key={key} fitContent>
                  <ListItem>
                    {"X".repeat(Math.floor(Math.random() * 6) + 20)}
                  </ListItem>
                </Skeleton>
              ))}
        </List>
      </Stack>
    </Stack>
  );
}

export default OrderHistory;
