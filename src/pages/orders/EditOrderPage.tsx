import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
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
import { child, get, ref, remove } from "firebase/database";
import { memo, useEffect, useRef, useState } from "react";
import { FieldValues, UseFormUnregister, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../../config/firebase";
import { getCustomerName } from "../../utils/utils";
import { formatDateTime } from "../../utils/format";
import ContentWrapper from "../dashboard/ContentWrapper";
import handleEditOrder from "./handle-edit-order";
import productList from "./product-list";
import { HiArrowLeft } from "react-icons/hi2";

function EditOrderPage() {
  const [order, setOrder] = useState<Order | undefined>(undefined);

  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting, dirtyFields, isDirty },
  } = useForm<EditOrderForm>({
    defaultValues: order,
  });

  const onSubmit = handleSubmit((data) => {
    for (const field in data) {
      if (!(field in dirtyFields)) {
        delete data[field as keyof EditOrderForm];
      }
    }

    handleEditOrder(data, id, navigate, toast);
  });

  const handleDeleteOrder = async () => {
    await remove(ref(database, `orders/${id}`));

    toast({
      title: "Pesanaan berhasil dihapus",
      status: "success",
      duration: 3000,
    });
    
    navigate("/orders/my-orders");
  };

  useEffect(() => {
    if (id) {
      get(child(ref(database, "orders"), id)).then(async (snapshot) => {
        if (snapshot.exists()) {
          const order: Order = snapshot.val();
          const customerUid = order.customer;

          order.customer = await getCustomerName(customerUid);
          setOrder(order);
        }
      });
    }
  }, [id]);

  return (
    <ContentWrapper title="Edit Pesanan">
      {order ? (
        <>
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
              gap="7"
            >
              <Stack px="auto" alignItems={{ base: "center", lg: "stretch" }}>
                <Heading
                  fontSize={{ base: "2xl", lg: "3xl" }}
                  fontWeight="600"
                  my="auto"
                >
                  {order.customer}
                </Heading>
                <Text>
                  Ditambahkan:{" "}
                  {formatDateTime(order.createdAt, {
                    isIncludeTime: true,
                    isShortDate: true,
                  })}
                </Text>
                <Divider w={{ base: "sm", lg: "full" }} pt="3" />
              </Stack>
              <Stack
                direction={{ base: "column", lg: "row" }}
                gap={{ base: 0, lg: 7 }}
                alignItems={{ base: "center", lg: "stretch" }}
              >
                <Stack w="full" maxW="sm">
                  <FormControl>
                    <FormLabel
                      fontStyle={
                        dirtyFields.qty?.base || dirtyFields.qty?.bonus
                          ? "italic"
                          : undefined
                      }
                    >
                      Jumlah
                    </FormLabel>
                    <HStack justifyContent="space-between">
                      <InputGroup>
                        <Input
                          type="number"
                          defaultValue={order.qty.base}
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
                          defaultValue={order.qty.bonus}
                          {...register("qty.bonus", {
                            valueAsNumber: true,
                          })}
                        />
                        <InputRightAddon paddingInline="3">zak</InputRightAddon>
                      </InputGroup>
                    </HStack>
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      fontStyle={dirtyFields.product ? "italic" : undefined}
                    >
                      Jenis Barang
                    </FormLabel>
                    <Select
                      {...register("product")}
                      defaultValue={order.product}
                    >
                      {Object.entries(productList).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      fontStyle={
                        dirtyFields.additionalInfo ? "italic" : undefined
                      }
                    >
                      Keterangan Tambahan
                    </FormLabel>
                    <Input
                      type="text"
                      {...register("additionalInfo")}
                      defaultValue={order.additionalInfo}
                    />
                  </FormControl>
                </Stack>

                <Stack w="full" maxW="sm">
                  <OptionalFieldContainer
                    formLabel="Pembayaran"
                    checkboxLabel="jika tunai/transfer"
                    unregister={() => resetField("payment")}
                    isDefaultValue={order.payment !== undefined}
                    isDirty={dirtyFields.payment !== undefined}
                  >
                    <VStack>
                      <Select
                        {...register("payment.type")}
                        defaultValue={order.payment?.type}
                      >
                        <option value="cash">Tunai</option>
                        <option value="transfer">Transfer</option>
                      </Select>
                      <InputGroup>
                        <InputLeftAddon>Rp.</InputLeftAddon>
                        <Input
                          type="number"
                          {...register("payment.amount", {
                            valueAsNumber: true,
                          })}
                          min="0"
                          defaultValue={order.payment?.amount}
                        />
                      </InputGroup>
                    </VStack>
                  </OptionalFieldContainer>

                  <OptionalFieldContainer
                    formLabel="Waktu"
                    checkboxLabel="jika waktu dijadwalkan"
                    unregister={() => resetField("scheduledTime")}
                    isDefaultValue={order.scheduledTime !== undefined}
                    isDirty={dirtyFields.scheduledTime !== undefined}
                  >
                    <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="date"
                      defaultValue={
                        order?.scheduledTime &&
                        new Date(order.scheduledTime).toISOString().slice(0, 10)
                      }
                      {...register("scheduledTime", {
                        setValueAs: (v) => Date.parse(v),
                      })}
                    />
                  </OptionalFieldContainer>

                  <OptionalFieldContainer
                    formLabel="Lokasi"
                    checkboxLabel="jika lokasi ditentukan"
                    unregister={() => resetField("location")}
                    isDefaultValue={order.location !== undefined}
                    isDirty={dirtyFields.location !== undefined}
                  >
                    <Input
                      placeholder="https://goo.gl/maps/*"
                      size="md"
                      type="url"
                      defaultValue={order.location}
                      {...register("location", {
                        shouldUnregister: true,
                      })}
                    />
                  </OptionalFieldContainer>
                </Stack>
              </Stack>

              <Stack
                alignItems="center"
                justifyContent="flex-end"
                direction={{ base: "column", lg: "row" }}
                mt="10"
              >
                <Button
                  colorScheme="gray"
                  w="full"
                  variant="outline"
                  maxW={{ base: "sm", lg: "max" }}
                  leftIcon={<HiArrowLeft />}
                  onClick={() => navigate("/orders/my-orders")}
                >
                  Kembali
                </Button>
                <Button
                  colorScheme="red"
                  w="full"
                  variant="outline"
                  maxW={{ base: "sm", lg: "24" }}
                  onClick={handleDeleteOrder}
                >
                  Hapus
                </Button>
                <Button
                  type="submit"
                  colorScheme="green"
                  isLoading={isSubmitting}
                  isDisabled={!isDirty}
                  w="full"
                  maxW={{ base: "sm", lg: "24" }}
                >
                  Simpan
                </Button>
              </Stack>
            </Stack>
          </form>
        </>
      ) : (
        <Text>Order not found</Text>
      )}
    </ContentWrapper>
  );
}

type OptionalFieldContainerProps = {
  formLabel: string;
  checkboxLabel: string;
  unregister: () => ReturnType<UseFormUnregister<FieldValues>>;
  isDefaultValue: boolean;
  isDirty: boolean;
  children: React.ReactNode;
};

const OptionalFieldContainer = memo(function OFC({
  formLabel,
  checkboxLabel,
  unregister,
  isDefaultValue,
  isDirty,
  children,
}: OptionalFieldContainerProps) {
  const [isFieldVisible, setIsFieldVisible] = useState(isDefaultValue);
  const prevIsFieldVisible = useRef(isFieldVisible);

  useEffect(() => {
    if (!isFieldVisible && prevIsFieldVisible.current) {
      unregister();
    }
    prevIsFieldVisible.current = isFieldVisible;
  }, [isFieldVisible]);

  return (
    <FormControl>
      <FormLabel
        display="flex"
        justifyContent="space-between"
        marginInlineEnd={0}
        fontStyle={isDirty ? "italic" : undefined}
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
            defaultChecked={isFieldVisible}
            isDisabled={isDefaultValue}
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

export default EditOrderPage;
