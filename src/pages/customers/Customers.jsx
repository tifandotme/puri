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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import indonesia from "territory-indonesia";

export default function Customers() {
  return (
    <Stack spacing="6">
      <Heading>Customers</Heading>

      <HStack>
        <Button colorScheme="green" variant="solid">
          Tambah
        </Button>
      </HStack>

      <Tabs variant="line" colorScheme="blue" defaultIndex={1}>
        <TabList>
          <Tab>Perorangan</Tab>
          <Tab>Toko Bangunan</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>asdasdasdasd</TabPanel>
          <TabPanel>
            <AddCustomer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}

function AddCustomer() {
  const [isLoading, setLoading] = useState(false);
  const [regencies, setRegencies] = useState([]);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const handleAddCustomer = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleAddCustomer)}>
      <Stack spacing="6">
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
        {/* <FormControl>
          <FormLabel htmlFor="address">Alamat</FormLabel>
          <Select
            id="address"
            placeholder="Kota/Kabupaten"
            {...register("alamat.kota", { required: true })}
            onChange={(e) => setChosenRegency(e.target.value)}
          >
            {regencies.data &&
              regencies.data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Select>
          <Text>{chosenRegency}</Text> */}
        {/* <Select
            placeholder="Kecamatan"
            {...register("alamat.kecamatan", { required: true })}
          >
            {districts.data &&
              districts.data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Select> */}
        {/* </FormControl> */}
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
