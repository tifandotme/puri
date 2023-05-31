import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  District,
  Regency,
  Village,
  getDistrictsOfRegencyName,
  getRegenciesOfProvinceId,
  getVillagesOfDistrictName,
} from "territory-indonesia";
import ContentWrapper from "../dashboard/ContentWrapper";
import CustomerTypeRadio from "./CustomerTypeRadio";
import { handleAddCustomer } from "./handle-customer";

function AddCustomerPage() {
  const toast = useToast({
    duration: 3000,
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<AddCustomerForm>({
    defaultValues: {
      type: "individu",
    },
  });

  const [customerType, setCustomerType] = useState<CustomerType>("individu");

  const [regencies, setRegencies] = useState<Regency[] | undefined>(undefined);
  const [chosenRegency, setChosenRegency] = useState("");

  const [districts, setDistricts] = useState<District[] | undefined>(undefined);
  const [chosenDistrict, setChosenDistrict] = useState("");

  const [villages, setVillages] = useState<Village[] | undefined>(undefined);
  const [chosenVillage, setChosenVillage] = useState("");

  useEffect(() => {
    getRegenciesOfProvinceId("33").then((data) => {
      setRegencies(data);
    });
  }, []);

  useEffect(() => {
    if (chosenRegency) {
      getDistrictsOfRegencyName(chosenRegency).then((data) => {
        setDistricts(data);
      });
    } else {
      setDistricts(undefined);
    }

    // cleanup regardless of chosenRegency
    setChosenDistrict("");
    setChosenVillage("");
    setVillages(undefined);
  }, [chosenRegency]);

  useEffect(() => {
    if (chosenDistrict) {
      getVillagesOfDistrictName(chosenDistrict).then((data) => {
        setVillages(data);
      });
    } else {
      setVillages(undefined);
    }

    // cleanup regardless of chosenDistrict
    setChosenVillage("");
  }, [chosenDistrict]);

  const onSubmit = handleSubmit((data) =>
    handleAddCustomer(data, navigate, toast)
  );

  return (
    <ContentWrapper title="Tambah Pelanggan" icon={MdPerson}>
      <form onSubmit={onSubmit}>
        <Stack
          spacing="12"
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
          <CustomerTypeRadio
            control={control}
            register="type"
            setCustomerType={setCustomerType}
          />

          <Stack
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 0, lg: 7 }}
            alignItems={{ base: "center", lg: "stretch" }}
          >
            <Stack w="full" maxW="sm">
              <FormControl isRequired>
                <FormLabel>
                  {customerType === "perusahaan"
                    ? "Nama Perusahaan"
                    : "Nama Lengkap"}
                </FormLabel>
                <HStack>
                  {customerType === "perusahaan" && (
                    <Select
                      defaultValue="PT"
                      w="28"
                      {...register("prefixName")}
                    >
                      <option value="PT">PT</option>
                      <option value="CV">CV</option>
                      <option value="TB">TB</option>
                    </Select>
                  )}
                  <Input type="text" {...register("name")} />
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>
                  {customerType === "perusahaan" ? "No NPWP" : "No KTP"}
                </FormLabel>
                <Input type="text" {...register("id")} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Telp</FormLabel>
                <Input
                  type="tel"
                  pattern="[0-9]{5,15}"
                  placeholder="081234567890"
                  {...register("phone", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Telp 2 (Opsional)</FormLabel>
                <Input
                  type="tel"
                  pattern="[0-9]{5,15}"
                  placeholder="081234567890"
                  {...register("phone2", {
                    required: false,
                    valueAsNumber: true,
                  })}
                />
              </FormControl>
            </Stack>

            <Stack w="full" maxW="sm">
              <FormControl isRequired>
                <FormLabel>Kota/Kabupaten</FormLabel>
                <Select
                  {...register("address.regency")}
                  onChange={(e) => setChosenRegency(e.target.value)}
                  placeholder="—Kota/Kabupaten—"
                >
                  {regencies &&
                    regencies.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Kecamatan</FormLabel>
                <Select
                  isDisabled={!chosenRegency}
                  {...register("address.district")}
                  onChange={(e) => setChosenDistrict(e.target.value)}
                  placeholder="—Kecamatan—"
                >
                  {districts &&
                    districts.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Kelurahan</FormLabel>
                <Select
                  isDisabled={!chosenDistrict}
                  {...register("address.village")}
                  onChange={(e) => setChosenVillage(e.target.value)}
                  placeholder="—Kelurahan—"
                >
                  {villages &&
                    villages.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Jalan</FormLabel>
                <Textarea
                  isDisabled={!chosenVillage}
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
              maxW={{ base: "sm", lg: "24" }}
              onClick={() => navigate("/customers/")}
            >
              Batal
            </Button>
            <Button
              type="submit"
              colorScheme="green"
              w="full"
              isLoading={isSubmitting}
              isDisabled={!isDirty}
              maxW={{ base: "sm", lg: "24" }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </form>
    </ContentWrapper>
  );
}

export default AddCustomerPage;
