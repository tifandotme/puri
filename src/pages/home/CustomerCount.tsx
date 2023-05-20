import { HStack, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useContext, useMemo, useState } from "react";
import { auth } from "../../config/firebase";
import { CustomerListContext } from "../ContextProviders";
import { Ellipsis } from "./Panel";

function CustomerCount() {
  const { customerList, isLoading } = useContext(CustomerListContext);

  const options = {
    "all-customers": "Semua",
    "my-customers": "Milik saya",
  } as const;

  const [chosenOption, setOption] =
    useState<keyof typeof options>("all-customers");

  const count = useMemo(() => {
    if (!customerList) return;

    const mine = Object.values(customerList).filter(
      ({ sales }) => sales === auth.currentUser?.uid
    ).length;

    const all = Object.keys(customerList).length;

    return {
      "my-customers": mine,
      "all-customers": all,
    };
  }, [customerList]);

  return (
    <Stack justify="space-between" h="full">
      <HStack justify="space-between" align="flex-start">
        <Text fontWeight="bold">Jumlah Pelanggan</Text>
        <Ellipsis
          options={options}
          defaultValue={chosenOption}
          setState={setOption}
        />
      </HStack>
      <Stack h="20" justify="flex-end" align="flex-start">
        <Skeleton isLoaded={!isLoading} w="20">
          <Text
            color={count ? "black" : "muted"}
            fontWeight="300"
            fontSize="5xl"
            lineHeight="1"
            w="max-content"
          >
            {count ? count[chosenOption] : "0"}
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
