import { HStack, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useContext, useMemo, useState } from "react";
import { OrderListContext } from "../../App";
import { Ellipsis } from "./Panel";

function OrderCount() {
  const { orderList, isLoading } = useContext(OrderListContext);

  const options = {
    "last-seven-days": "7 hari terakhir",
    "all-time": "Semua waktu",
  } as const;

  const [chosenOption, setOption] =
    useState<keyof typeof options>("last-seven-days");

  const count = useMemo(() => {
    if (!orderList) return;

    const lastSevenDays = Object.values(orderList).filter((order) => {
      const now = new Date();
      const createdAt = new Date(order.createdAt);

      const diffTime = Math.abs(now.getTime() - createdAt.getTime());

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays <= 7;
    }).length;

    const allTime = Object.keys(orderList).length;

    return {
      "last-seven-days": lastSevenDays,
      "all-time": allTime,
    };
  }, [orderList]);

  return (
    <Stack justify="space-between" h="full">
      <HStack justify="space-between">
        <Text fontWeight="bold">Jumlah Pesanan</Text>
        <Ellipsis
          options={options}
          defaultValue="last-seven-days"
          setState={setOption}
        />
      </HStack>
      <Stack h="20" justify="flex-end" align="flex-start">
        <Skeleton isLoaded={!isLoading} fitContent>
          <Text fontWeight="300" fontSize="5xl" lineHeight="1" w="max-content">
            {count ? count[chosenOption] : "XXX"}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} fitContent>
          <Text color="muted" fontSize="sm" lineHeight="1.2">
            tercatat
          </Text>
        </Skeleton>
      </Stack>
    </Stack>
  );
}

export default OrderCount;
