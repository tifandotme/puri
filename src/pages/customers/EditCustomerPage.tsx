import {
  Badge,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { child, get, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowLeft } from "react-icons/hi2";
import { MdPerson } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {
  District,
  Regency,
  Village,
  getDistrictsOfRegencyName,
  getRegenciesOfProvinceId,
  getVillagesOfDistrictName,
} from "territory-indonesia";
import { database } from "../../config/firebase";
import { formatDateTime } from "../../utils/format";
import ContentWrapper from "../dashboard/ContentWrapper";
import { handleEditCustomer } from "./handle-customer";

function EditCustomerPage() {
  const toast = useToast({
    duration: 3000,
  });
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;

    get(child(ref(database, "customers"), id)).then((snapshot) => {
      if (snapshot.exists()) {
        setCustomer(snapshot.val());
      }
    });
  }, [id]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, dirtyFields, isDirty },
  } = useForm<EditCustomerForm>({
    defaultValues: customer,
  });

  const [regencies, setRegencies] = useState<Regency[] | undefined>(undefined);
  const [districts, setDistricts] = useState<District[] | undefined>(undefined);
  const [villages, setVillages] = useState<Village[] | undefined>(undefined);

  const [chosenDistrict, setChosenDistrict] = useState("");

  useEffect(() => {
    if (customer) {
      const { regency, district } = customer.address;

      setChosenDistrict(district);

      getDistrictsOfRegencyName(regency).then((data) => {
        setDistricts(data);
      });
      getVillagesOfDistrictName(district).then((data) => {
        setVillages(data);
      });
    } else {
      // on component mount, pick Jawa Tengah as default province
      getRegenciesOfProvinceId("33").then((data) => {
        setRegencies(data);
      });
    }
  }, [customer]);

  useEffect(() => {
    const subscribe = watch((value, { name, type }) => {
      if (!value.address && type !== "change") return;

      const { regency, district } = value.address as CustomerAddress;

      switch (name) {
        case "address.regency":
          setChosenDistrict("");

          getDistrictsOfRegencyName(regency).then((data) => {
            setDistricts(data);
          });
          break;
        case "address.district":
          setChosenDistrict(district);

          getVillagesOfDistrictName(district).then((data) => {
            setVillages(data);
          });
          break;
      }
    });

    return () => subscribe.unsubscribe();
  }, [watch]);

  const onSubmit = handleSubmit((data) => {
    for (const field in data) {
      if (!(field in dirtyFields)) {
        delete data[field as keyof EditCustomerForm];
      }
    }

    handleEditCustomer(data, id, navigate, toast);
  });

  const handleDeleteCustomer = async () => {
    await remove(ref(database, `customers/${id}`));

    toast({
      title: "Pelanggan berhasil dihapus",
      status: "success",
    });

    navigate("/customers/my-customers");
  };

  return (
    <ContentWrapper title="Edit Pelanggan" icon={MdPerson}>
      {customer ? (
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
                  {customer.name}
                  <Badge
                    backgroundColor={
                      customer?.type === "individu" ? "green.200" : "blue.200"
                    }
                    marginLeft="2"
                    fontSize="sm"
                  >
                    {customer?.type}
                  </Badge>
                </Heading>
                <Text>
                  Ditambahkan:{" "}
                  {formatDateTime(customer.createdAt, { isIncludeTime: true })}
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
                      fontStyle={dirtyFields.id ? "italic" : undefined}
                    >
                      {customer.type === "perusahaan" ? "No NPWP" : "No KTP"}
                    </FormLabel>
                    <Input
                      isRequired
                      defaultValue={customer.id}
                      {...register("id")}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      fontStyle={dirtyFields.phone ? "italic" : undefined}
                    >
                      Telp
                    </FormLabel>
                    <Input
                      isRequired
                      type="tel"
                      pattern="[0-9]{5,15}"
                      placeholder="081234567890"
                      defaultValue={customer.phone}
                      {...register("phone", {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      fontStyle={dirtyFields.phone2 ? "italic" : undefined}
                    >
                      Telp 2
                    </FormLabel>
                    <Input
                      isRequired={Boolean(customer.phone2)}
                      type="tel"
                      pattern="[0-9]{5,15}"
                      placeholder="081234567890"
                      defaultValue={customer.phone2}
                      {...register("phone2", {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>
                </Stack>

                <Stack w="full" maxW="sm">
                  <FormControl>
                    <FormLabel
                      fontStyle={
                        dirtyFields.address?.regency ? "italic" : undefined
                      }
                    >
                      Kota/Kabupaten
                    </FormLabel>
                    {regencies && (
                      <Select
                        isRequired
                        {...register("address.regency")}
                        defaultValue={customer.address.regency}
                      >
                        {regencies.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      fontStyle={
                        dirtyFields.address?.district ? "italic" : undefined
                      }
                    >
                      Kecamatan
                    </FormLabel>
                    {districts && (
                      <Select
                        isRequired
                        {...register("address.district")}
                        placeholder="—"
                        defaultValue={customer.address.district}
                      >
                        {districts.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      fontStyle={
                        dirtyFields.address?.village ? "italic" : undefined
                      }
                    >
                      Kelurahan
                    </FormLabel>
                    {villages && (
                      <Select
                        isRequired
                        isDisabled={!chosenDistrict}
                        {...register("address.village")}
                        placeholder="—"
                        defaultValue={customer.address.village}
                      >
                        {villages.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      fontStyle={
                        dirtyFields.address?.street ? "italic" : undefined
                      }
                    >
                      Jalan
                    </FormLabel>
                    <Textarea
                      placeholder="Nama Jalan (No. Rumah/Patokan)"
                      {...register("address.street")}
                      defaultValue={customer.address.street}
                    />
                  </FormControl>
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
                  onClick={() => navigate("/customers/my-customers")}
                >
                  Kembali
                </Button>
                <Button
                  colorScheme="red"
                  w="full"
                  variant="outline"
                  maxW={{ base: "sm", lg: "24" }}
                  onClick={handleDeleteCustomer}
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
        <Text>Customer not found</Text>
      )}
    </ContentWrapper>
  );
}

export default EditCustomerPage;
