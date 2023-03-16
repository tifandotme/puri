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
import {
  District,
  getDistrictsOfRegencyName,
  getRegenciesOfProvinceId,
  getVillagesOfDistrictName,
  Regency,
  Village,
} from "territory-indonesia";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import ContentWrapper from "../dashboard/ContentWrapper";
import handleAddCustomer from "./handleAddCustomer";
import CustomerTypeRadio from "./CustomerTypeRadio";

function AddCustomer() {
  const toast = useToast();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isSubmitting },
  } = useForm();

  const [customerType, setCustomerType] = useState("");

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

  const onSubmit = handleSubmit((data) => handleAddCustomer(data, navigate, toast));

  return (
    <ContentWrapper title="Tambah Pelanggan">
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
          borderWidth={{ base: 0, lg: 10 }}
          borderColor="gray.200"
        >
          <CustomerTypeRadio
            control={control}
            setCustomerType={setCustomerType}
          />

          <Stack
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 0, lg: 7 }}
            alignItems={{ base: "center", lg: "stretch" }}
          >
            <Stack w="full" maxW="sm">
              <FormControl isRequired>
                <FormLabel htmlFor="name">
                  {customerType === "perusahaan"
                    ? "Nama Perusahaan"
                    : "Nama Lengkap"}
                </FormLabel>
                <HStack>
                  {customerType === "perusahaan" && (
                    <Select
                      defaultValue="pt"
                      w="28"
                      {...register("prefixName", { required: true })}
                    >
                      <option value="PT">PT</option>
                      <option value="CV">CV</option>
                      <option value="UD">UD</option>
                    </Select>
                  )}
                  <Input
                    id="name"
                    type="text"
                    {...register("name", { required: true })}
                  />
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="id">
                  {customerType === "perusahaan" ? "No NPWP" : "No KTP"}
                </FormLabel>
                <Input
                  id="id"
                  type="number"
                  {...register("id", { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="phone">Telp</FormLabel>
                <Input
                  placeholder="081122223333"
                  id="phone"
                  type="tel"
                  {...register("phone", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="phone2">Telp 2 (Opsional)</FormLabel>
                <Input
                  placeholder="081122223333"
                  id="phone2"
                  type="tel"
                  {...register("phone2", { required: false })}
                />
              </FormControl>
            </Stack>

            <Stack w="full" maxW="sm">
              <FormControl isRequired>
                <FormLabel htmlFor="city">Kota/Kabupaten</FormLabel>
                <Select
                  id="city"
                  isDisabled={!regencies}
                  {...register("address.city", { required: true })}
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
                <FormLabel htmlFor="regency">Kecamatan</FormLabel>
                <Select
                  id="regency"
                  isDisabled={!chosenRegency}
                  {...register("address.regency", { required: true })}
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
                <FormLabel htmlFor="district">Kelurahan</FormLabel>
                <Select
                  id="district"
                  isDisabled={!chosenDistrict}
                  {...register("address.district", { required: true })}
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
                <FormLabel htmlFor="street">Jalan</FormLabel>
                <Textarea
                  id="street"
                  isDisabled={!chosenVillage}
                  placeholder="Nama Jalan (No. Rumah/Patokan)"
                  {...register("address.street", { required: true })}
                />
              </FormControl>
            </Stack>
          </Stack>
          <Button type="submit" colorScheme="red" isLoading={isSubmitting}>
            Tambah
          </Button>
        </Stack>
      </form>
    </ContentWrapper>
  );
}

export default AddCustomer;
