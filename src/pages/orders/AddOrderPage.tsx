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
  useToast,
} from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { FieldValues, UseFormUnregister, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../dashboard/ContentWrapper";
import CustomerNameSelect from "./CustomerNameSelect";
import handleAddOrder from "./handle-add-order";
import productList from "./product-list";

function AddOrderPage() {
  const toast = useToast();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { isSubmitting },
  } = useForm<AddOrderForm>();

  const onSubmit = handleSubmit((data) => {
    handleAddOrder(data, navigate, toast);
  });

  return (
    <ContentWrapper title="Tambah Pesanan">
      <form onSubmit={onSubmit}>
        <Stack
          spacing="6"
          maxW="3xl"
          mx="auto"
          my={{ base: 0, lg: 5 }}
          borderRadius={{ base: 0, lg: 10 }}
          py="10"
          px={{ base: 5, lg: 10 }}
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
                <CustomerNameSelect control={control} register="customer" />
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
                <FormLabel>Jenis Barang</FormLabel>
                <Select {...register("product")}>
                  {Object.entries(productList).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Keterangan Tambahan</FormLabel>
                <Input type="text" {...register("additionalInfo")} />
              </FormControl>
            </Stack>

            <Stack w="full" maxW="sm">
              <OptionalFieldContainer
                formLabel="Pembayaran"
                checkboxLabel="jika tunai/transfer"
                unregister={() => resetField("payment")}
              >
                <VStack>
                  <Select {...register("payment.type", { required: false })}>
                    <option value="cash">Tunai</option>
                    <option value="transfer">Transfer</option>
                  </Select>
                  <InputGroup>
                    <InputLeftAddon>Rp.</InputLeftAddon>
                    <Input
                      type="number"
                      {...register("payment.amount", {
                        valueAsNumber: true,
                        required: false,
                      })}
                      min="0"
                      isRequired
                    />
                  </InputGroup>
                </VStack>
              </OptionalFieldContainer>

              <OptionalFieldContainer
                formLabel="Waktu"
                checkboxLabel="jika waktu dijadwalkan"
                unregister={() => resetField("scheduledTime")}
              >
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  isRequired
                  {...register("scheduledTime", {
                    setValueAs: (v) => Date.parse(v),
                  })}
                />
              </OptionalFieldContainer>

              <OptionalFieldContainer
                formLabel="Lokasi"
                checkboxLabel="jika lokasi ditentukan"
                unregister={() => resetField("location")}
              >
                <Input
                  size="md"
                  type="url"
                  placeholder="https://goo.gl/maps/*"
                  isRequired
                  {...register("location", {
                    shouldUnregister: true,
                  })}
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

type OptionalFieldContainerProps = {
  formLabel: string;
  checkboxLabel: string;
  unregister: () => ReturnType<UseFormUnregister<FieldValues>>;
  children: React.ReactNode;
};

const OptionalFieldContainer = memo(function OFC({
  formLabel,
  checkboxLabel,
  unregister,
  children,
}: OptionalFieldContainerProps) {
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
          userSelect="none"
        >
          <Icon as={GiCheckMark} /> {checkboxLabel}&nbsp;&nbsp;
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
});

export default AddOrderPage;
