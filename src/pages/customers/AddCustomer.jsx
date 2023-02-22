import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import indonesia from "territory-indonesia";
import ContentWrapper from "../components/ContentWrapper";

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
      <Container maxW={{ base: "full", lg: "3xl" }} border="1px solid red">
        <form onSubmit={handleSubmit(handleAddCustomer)}>
          <VStack spacing="6" border="1px solid green" align="stretch">
            <Stack
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              gap="4"
              maxW={{ base: "lg", lg: "full" }}
              margin="auto"
            >
              <VStack w="full">
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
                  <FormLabel htmlFor="phone2">Telp (Opsional)</FormLabel>
                  <Input
                    placeholder="+62800000000"
                    id="phone2"
                    type="number"
                    isRequired
                    {...register("phone2", { required: false })}
                  />
                </FormControl>
              </VStack>
              <VStack w="full">
                <FormControl>
                  <FormLabel htmlFor="address">Alamat</FormLabel>
                  <VStack spacing="2">
                    <Select
                      id="address"
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

                    <Select
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

                    <Select
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

                    <Textarea
                      isDisabled={chosenVillage.length === 0}
                      placeholder="Nama Jalan (Nomor/Patokan)"
                      {...register("alamat.jalan", { required: true })}
                    />
                  </VStack>
                </FormControl>
              </VStack>
            </Stack>
            <Button type="submit" colorScheme="red" isLoading={isLoading}>
              Tambah
            </Button>
          </VStack>
        </form>
      </Container>
    </ContentWrapper>
  );
}

export default AddCustomer;
