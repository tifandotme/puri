import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import indonesia from "territory-indonesia";
import DashboardContentWrapper from "../DashboardContentWrapper";
import CustomerTypeRadio from "./CustomerTypeRadio";
import handleAddCustomer from "./handleAddCustomer";

function AddCustomer() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [regencies, setRegencies] = useState([]);
  const [chosenRegency, setChosenRegency] = useState("");

  const [districts, setDistricts] = useState([]);
  const [chosenDistrict, setChosenDistrict] = useState("");

  const [villages, setVillages] = useState([]);
  const [chosenVillage, setChosenVillage] = useState("");

  const [customerType, setCustomerType] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    indonesia.getRegenciesOfProvinceId("33").then((data) => {
      setRegencies(data);
    });
  }, []);

  useEffect(() => {
    if (chosenRegency) {
      indonesia.getDistrictsOfRegencyName(chosenRegency).then((data) => {
        setDistricts(data);
      });
    } else {
      setDistricts([]);
      // setChosenRegency will be an empty string from onChange
    }

    // cleanup regardless of chosenRegency
    setChosenDistrict("");
    setChosenVillage("");
    setVillages([]);
  }, [chosenRegency]);

  useEffect(() => {
    if (chosenDistrict) {
      indonesia.getVillagesOfDistrictName(chosenDistrict).then((data) => {
        setVillages(data);
      });
    } else {
      setVillages([]);
    }

    // cleanup regardless of chosenDistrict
    setChosenVillage("");
  }, [chosenDistrict]);

  const onSubmit = handleSubmit((data) => {
    return handleAddCustomer(data, setLoading, navigate);
  });

  return (
    <DashboardContentWrapper title="Tambah Pelanggan">
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
          borderWidth={{ base: null, lg: 1 }}
          borderColor="gray.200"
        >
          <CustomerTypeRadio control={control} setType={setCustomerType} />

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
                <Input
                  id="name"
                  type="text"
                  {...register("name", { required: true })}
                />
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
                  placeholder="+62800000000"
                  id="phone"
                  type="number"
                  {...register("phone", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="phone2">Telp 2 (Opsional)</FormLabel>
                <Input
                  placeholder="+62800000000"
                  id="phone2"
                  type="number"
                  {...register("phone2", { required: false })}
                />
              </FormControl>
            </Stack>

            <Stack w="full" maxW="sm">
              <FormControl isRequired>
                <FormLabel htmlFor="city">Kota/Kabupaten</FormLabel>
                <Select
                  id="city"
                  isDisabled={regencies.length === 0}
                  {...register("address.city", { required: true })}
                  onChange={(e) => setChosenRegency(e.target.value)}
                  placeholder="—Kota/Kabupaten—"
                >
                  {regencies.map((item) => (
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
                  isDisabled={chosenRegency.length === 0}
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
                  isDisabled={chosenDistrict.length === 0}
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
                  isDisabled={chosenVillage.length === 0}
                  placeholder="Nama Jalan (No. Rumah/Patokan)"
                  {...register("address.street", { required: true })}
                />
              </FormControl>
            </Stack>
          </Stack>
          <Button type="submit" colorScheme="red" isLoading={isLoading}>
            Tambah
          </Button>
        </Stack>
      </form>
    </DashboardContentWrapper>
  );
}

export default AddCustomer;
