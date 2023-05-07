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

function EditCustomerPage() {
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);

  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, dirtyFields, isDirty },
  } = useForm<EditCustomerForm>({
    defaultValues: customer,
  });

  const onSubmit = handleSubmit((data) => {
    for (const field in data) {
      if (!(field in dirtyFields)) {
        delete data[field as keyof EditCustomerForm];
      }
    }

    // handleEditCustomer(data, id, navigate, toast);

    console.log("submitted data", data);
  });

  const handleDeleteCustomer = async () => {
    await remove(ref(database, `customers/${id}`));
    toast({
      title: "Pelanggan berhasil dihapus",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    navigate("/customers/my-customers");
  };

  useEffect(() => {
    if (id) {
      get(child(ref(database, "customers"), id)).then((snapshot) => {
        if (snapshot.exists()) {
          setCustomer(snapshot.val());
        }
      });
    }
  }, [id]);

  const [regencies, setRegencies] = useState<Regency[] | undefined>(undefined);
  const [chosenRegency, setChosenRegency] = useState("");

  const [districts, setDistricts] = useState<District[] | undefined>(undefined);
  const [chosenDistrict, setChosenDistrict] = useState("");

  const [villages, setVillages] = useState<Village[] | undefined>(undefined);
  const [, setChosenVillage] = useState("");

  useEffect(() => {
    getRegenciesOfProvinceId("33").then((data) => {
      setRegencies(data);
    });
    getDistrictsOfRegencyName(chosenRegency).then((data) => {
      setDistricts(data);
    });
    getVillagesOfDistrictName(chosenDistrict).then((data) => {
      setVillages(data);
    });
  }, []);

  useEffect(() => {
    if (customer) {
      setChosenRegency(customer.address.regency);
      setChosenDistrict(customer.address.district);
      setChosenVillage(customer.address.village);
    }
  }, [customer]);

  console.log(dirtyFields);

  return (
    <ContentWrapper title="Edit Pelanggan">
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
                      type="number"
                      defaultValue={customer.id}
                      {...register("id", { valueAsNumber: true })}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      fontStyle={dirtyFields.phone ? "italic" : undefined}
                    >
                      Telp
                    </FormLabel>
                    <Input
                      type="tel"
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
                      type="tel"
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
                        {...register("address.regency")}
                        // onChange={(e) => setChosenRegency(e.target.value)}
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
                        isDisabled={false}
                        {...register("address.district")}
                        // onChange={(e) => setChosenDistrict(e.target.value)}
                        // placeholder="—Kecamatan—"
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
                    <Select
                      // isDisabled={!chosenDistrict}
                      {...register("address.village")}
                      // onChange={(e) => setChosenVillage(e.target.value)}
                      // placeholder="—Kelurahan—"
                      defaultValue={customer.address.district}
                    >
                      {villages &&
                        villages.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                    </Select>
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
                      // isDisabled={!chosenVillage}
                      placeholder="Nama Jalan (No. Rumah/Patokan)"
                      {...register("address.street")}
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
