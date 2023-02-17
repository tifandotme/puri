import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import indonesia from "territory-indonesia";

export default function Customers() {
  return (
    <Stack spacing="6">
      {/* <Tabs variant="line" colorScheme="blue" defaultIndex={1}>
        <TabList>
          <Tab>Perorangan</Tab>
          <Tab>Toko Bangunan</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>asdasdasdasd</TabPanel>
          <TabPanel>asdasd</TabPanel>
        </TabPanels>
      </Tabs> */}
      <Heading>Customers</Heading>
      <HStack>
        <Button colorScheme="green" variant="solid">
          Tambah
        </Button>
      </HStack>
      <AddCustomer />
    </Stack>
  );
}

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
    // formState: { errors },
  } = useForm();

  const handleAddCustomer = (data) => {
    console.log(data);
  };

  useEffect(() => {
    setTimeout(() => {
      indonesia.getRegenciesOfProvinceId("33").then((data) => {
        setRegencies(data);
      });
    }, 1000);
  }, []);

  useEffect(() => {
    chosenRegency &&
      indonesia.getDistrictsOfRegencyName(chosenRegency).then((data) => {
        setDistricts(data);
      });
  }, [chosenRegency]);

  useEffect(() => {
    chosenDistrict &&
      indonesia.getVillagesOfDistrictName(chosenDistrict).then((data) => {
        setVillages(data);
      });
  }, [chosenDistrict]);

  return (
    <form onSubmit={handleSubmit(handleAddCustomer)}>
      <Stack spacing="6">
        <Stack
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          gap="4"
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
                id="phone"
                type="number"
                isRequired
                {...register("phone", { required: true })}
              />
            </FormControl>
          </VStack>
          <VStack w="full">
            <FormControl>
              <FormLabel htmlFor="address">Alamat</FormLabel>
              <VStack spacing="4">
                <Input
                  id="address"
                  type="text"
                  placeholder="Nama Jalan"
                  {...register("alamat.jalan", { required: true })}
                />

                <Select
                  isDisabled={regencies.length === 0}
                  {...register("alamat.kota", { required: true })}
                  onChange={(e) => setChosenRegency(e.target.value)}
                  placeholder="Kota/Kabupaten"
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
                  placeholder="Kecamatan"
                >
                  {districts.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Select>

                <Select
                  isDisabled={chosenDistrict.length === 0}
                  {...register("alamat.kelurahan", { required: true })}
                  onChange={(e) => setChosenVillage(e.target.value)}
                  placeholder="Kelurahan"
                >
                  {villages.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </VStack>
            </FormControl>
          </VStack>
        </Stack>
        <Text>{chosenRegency}</Text>
        <Text>{chosenDistrict}</Text>
        <Text>{chosenVillage}</Text>
        <Button
          type="submit"
          colorScheme="red"
          variant="solid"
          isLoading={isLoading}
        >
          Tambah
        </Button>
      </Stack>
    </form>
  );
}
