import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldValues, UseFormUnregister, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import ContentWrapper from "../dashboard/ContentWrapper";
import CustomerNameSelect from "./CustomerNameSelect";

function AddOrderPage() {
  const {
    register,
    handleSubmit,
    control,
    unregister,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const cementTypes: Record<string, string> = {
    serbaguna: "Dynamix Serbaguna",
    masonry: "Dynamix Masonry",
    extrapower: "Dynamix Extra Power",
    padang: "Semen Padang",
  };

  console.log("AddOrderPage component render");

  return (
    <ContentWrapper title="Tambah Pesanan">
      <form onSubmit={onSubmit}>
        <Stack
          spacing="6"
          maxW="3xl"
          minH="100vh"
          mx="auto"
          my={{ base: 0, lg: 5 }}
          borderRadius={{ base: 0, lg: 10 }}
          p={10}
          bg="white"
          borderWidth={{ base: 0, lg: 1 }}
          borderColor="gray.200"
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 0, lg: 7 }}
            alignItems={{ base: "center", lg: "stretch" }}
          >
            <Stack w="full" maxW="sm">
              <FormControl isRequired>
                <FormLabel>Nama Pelanggan</FormLabel>
                <CustomerNameSelect control={control} />
              </FormControl>

              <FormControl>
                <FormLabel>Jumlah</FormLabel>
                <HStack justifyContent="space-between">
                  <InputGroup>
                    <Input
                      isRequired
                      type="number"
                      placeholder="Qty"
                      {...register("qty.base", {
                        valueAsNumber: true,
                      })}
                    />
                    <InputRightAddon paddingInline="3">zak</InputRightAddon>
                  </InputGroup>
                  <Icon as={BiPlus} />
                  <InputGroup maxW="28">
                    <Input
                      type="number"
                      placeholder="Bns"
                      {...register("qty.bonus", {
                        required: false,
                        valueAsNumber: true,
                      })}
                    />
                    <InputRightAddon paddingInline="3">zak</InputRightAddon>
                  </InputGroup>
                </HStack>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Jenis Semen</FormLabel>
                <Select {...register("brand")}>
                  {Object.entries(cementTypes).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Keterangan Tambahan</FormLabel>
                <Input
                  type="text"
                  {...register("additionalInfo", { required: false })}
                />
              </FormControl>
            </Stack>

            <Stack w="full" maxW="sm">
              <OptionalFieldContainer
                formLabel="Pembayaran"
                checkboxLabel="centang jika tunai/transfer"
                unregister={() => unregister("cod")}
              >
                <VStack>
                  <Select {...register("cod.type")}>
                    <option value="cash">Tunai</option>
                    <option value="transfer">Transfer</option>
                  </Select>
                  <InputGroup>
                    <InputLeftAddon>Rp.</InputLeftAddon>
                    <Input
                      type="number"
                      {...register("cod.amount", {
                        valueAsNumber: true,
                        shouldUnregister: true,
                      })}
                      min="0"
                      isRequired
                    />
                  </InputGroup>
                </VStack>
              </OptionalFieldContainer>

              <OptionalFieldContainer
                formLabel="Waktu"
                checkboxLabel="centang jika waktu dijadwalkan"
                unregister={() => unregister("scheduledTime")}
              >
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  isRequired
                  {...register("scheduledTime")}
                />
              </OptionalFieldContainer>

              <OptionalFieldContainer
                formLabel="Lokasi"
                checkboxLabel="centang jika lokasi ditentukan"
                unregister={() => unregister("location")}
              >
                <Input
                  size="md"
                  type="url"
                  placeholder="https://goo.gl/maps/*"
                  isRequired
                  {...register("location")}
                />
              </OptionalFieldContainer>
            </Stack>
          </Stack>
          <Stack alignItems={{ base: "center", lg: "stretch" }}>
            <Button
              type="submit"
              colorScheme="red"
              isLoading={isSubmitting}
              w="full"
              maxW={{ base: "sm", lg: "full" }}
            >
              Tambah
            </Button>
          </Stack>
        </Stack>
      </form>
    </ContentWrapper>
  );
}

type OFCProps = {
  formLabel: string;
  checkboxLabel: string;
  unregister: () => ReturnType<UseFormUnregister<FieldValues>>;
  children: React.ReactNode;
};

function OptionalFieldContainer({
  formLabel,
  checkboxLabel,
  unregister,
  children,
}: OFCProps) {
  const [isFieldVisible, setIsFieldVisible] = useState(false);

  useEffect(() => {
    if (!isFieldVisible) {
      unregister();
    }
  }, [isFieldVisible]);

  return (
    <FormControl>
      <FormLabel
        display="flex"
        justifyContent="space-between"
        marginInlineEnd={0}
      >
        <Text as="span">{formLabel}&nbsp;&nbsp;</Text>

        <Text
          as="span"
          color="gray.400"
          fontStyle="italic"
          fontSize="sm"
          lineHeight="base"
        >
          {checkboxLabel}&nbsp;&nbsp;
          <Checkbox
            size="lg"
            borderColor="gray.400"
            colorScheme="gray"
            onChange={(e) => {
              setIsFieldVisible(e.target.checked);
            }}
          />
        </Text>
      </FormLabel>

      {isFieldVisible && <>{children}</>}
    </FormControl>
  );
}

export default AddOrderPage;
