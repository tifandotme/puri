import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import indonesia from "territory-indonesia";
import ContentWrapper from "../components/ContentWrapper";
import CustomerTypeRadio from "./CustomerTypeRadio";

function AddCustomer() {
  const [isLoading, setLoading] = useState(false);

  const [regencies, setRegencies] = useState([]);
  const [chosenRegency, setChosenRegency] = useState("");

  const [districts, setDistricts] = useState([]);
  const [chosenDistrict, setChosenDistrict] = useState("");

  const [villages, setVillages] = useState([]);
  const [chosenVillage, setChosenVillage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddCustomer = (data) => {
    console.log(data);
  };

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

  return (
    <ContentWrapper title="Add New Customer">
      <form onSubmit={handleSubmit(handleAddCustomer)}>
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
          <CustomerTypeRadio />
          <Stack
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 0, lg: 7 }}
            alignItems={{ base: "center", lg: "stretch" }}
          >
            <Stack w="full" maxW="sm">
              <FormControl>
                <FormLabel htmlFor="name">Nama</FormLabel>
                <Input
                  id="name"
                  type="text"
                  isRequired
                  {...register("name", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="phone">Telp</FormLabel>
                <Input
                  placeholder="+62800000000"
                  id="phone"
                  type="number"
                  isRequired
                  {...register("phone", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="phone2">Telp 2 (Opsional)</FormLabel>
                <Input
                  placeholder="+62800000000"
                  id="phone2"
                  type="number"
                  isRequired
                  {...register("phone2", { required: false })}
                />
              </FormControl>
            </Stack>
            <Stack w="full" maxW="sm">
              <FormControl>
                <FormLabel htmlFor="city">Kota/Kabupaten</FormLabel>
                <Select
                  id="city"
                  isDisabled={regencies.length === 0}
                  {...register("alamat.kota", { required: true })}
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

              <FormControl>
                <FormLabel htmlFor="regency">Kecamatan</FormLabel>
                <Select
                  id="regency"
                  isDisabled={chosenRegency.length === 0}
                  {...register("alamat.kecamatan", { required: true })}
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

              <FormControl>
                <FormLabel htmlFor="district">Kelurahan</FormLabel>
                <Select
                  id="district"
                  isDisabled={chosenDistrict.length === 0}
                  {...register("alamat.kelurahan", { required: true })}
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

              <FormControl>
                <FormLabel htmlFor="street">Jalan</FormLabel>
                <Textarea
                  id="street"
                  isDisabled={chosenVillage.length === 0}
                  placeholder="Nama Jalan (No. Rumah/Patokan)"
                  {...register("alamat.jalan", { required: true })}
                />
              </FormControl>
            </Stack>
          </Stack>
          <Button type="submit" colorScheme="red" isLoading={isLoading}>
            Tambah
          </Button>
        </Stack>
      </form>
    </ContentWrapper>
  );
}

export default AddCustomer;
