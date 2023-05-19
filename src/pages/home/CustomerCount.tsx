import { HStack, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useContext, useMemo, useState } from "react";
import { CustomerListContext } from "../../App";
import { auth } from "../../config/firebase";
import { Ellipsis } from "./Panel";

function CustomerCount() {
  const { customerList, isLoading } = useContext(CustomerListContext);

  const options = {
    "milik-saya": "Milik saya",
    semua: "Semua",
  } as const;

  const [chosenOption, setOption] =
    useState<keyof typeof options>("milik-saya");

  const count = useMemo(() => {
    if (!customerList) return;

    const mine = Object.values(customerList).filter(
      ({ sales }) => sales === auth.currentUser?.uid
    ).length;

    const all = Object.keys(customerList).length;

    return {
      "milik-saya": mine,
      semua: all,
    };
  }, [customerList]);

  return (
    <Stack justify="space-between" h="full">
      <HStack justify="space-between">
        <Text fontWeight="bold">Jumlah Pelanggan</Text>
        <Ellipsis
          options={options}
          defaultValue="milik-saya"
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
            terdaftar
          </Text>
        </Skeleton>
      </Stack>
    </Stack>
  );
}

export default CustomerCount;
