import { Skeleton, Stack, Text } from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import { formatDateTime, formatQtyProduct } from "../../utils/format";
import { OrderListContext } from "../ContextProviders";

function LatestOrder() {
  const { orderList, isLoading } = useContext(OrderListContext);

  const latestOrder = useMemo(() => {
    if (!orderList) return;

    const sorted = Object.entries(orderList).sort(
      (a, b) => b[1].createdAt - a[1].createdAt
    );

    return sorted[0][1];
  }, [orderList]);

  return (
    <Stack justify="space-between" h="full" gap="3">
      <Text fontWeight="bold">Pesanan Terakhir</Text>
      <Stack
        align="flex-start"
        justify="flex-end"
        overflow="hidden"
        whiteSpace="nowrap"
        gap="1"
      >
        <Skeleton isLoaded={!isLoading} w="24">
          <Text lineHeight="1" color="muted" fontSize="sm">
            {latestOrder &&
              formatDateTime(latestOrder.createdAt, {
                isIncludeTime: true,
                isShortDate: true,
              })}
            &nbsp;
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} w="56">
          <Text
            lineHeight="1"
            fontWeight="500"
            fontSize="2xl"
            color={latestOrder ? "black" : "muted"}
          >
            {latestOrder ? latestOrder.customer : "Belum ada pesanan"}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} w="36">
          <Text lineHeight="1" color="muted">
            {latestOrder &&
              formatQtyProduct(latestOrder.qty, latestOrder.product)}
            &nbsp;
          </Text>
        </Skeleton>
      </Stack>
    </Stack>
  );
}

export default LatestOrder;
