import {
  Heading,
  Image,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import { FaRegQuestionCircle } from "react-icons/fa";
import addButton from "../../assets/buttons.png";
import statusButton from "../../assets/change-status-button.png";
import usecase from "../../assets/usecase.png";
import ContentWrapper from "../dashboard/ContentWrapper";

function HelpPage() {
  return (
    <ContentWrapper title="Bantuan" icon={FaRegQuestionCircle}>
      <Stack
        maxW="3xl"
        mx="auto"
        my={{ base: 0, lg: 5 }}
        borderRadius={{ base: 0, lg: 10 }}
        py="10"
        px={{ base: 8, lg: 14 }}
        bg="white"
        borderWidth={{ base: 0, lg: 1 }}
        borderColor="gray.200"
      >
        <Heading variant="bantuan">Tentang Aplikasi</Heading>
        <UnorderedList pb="4">
          <ListItem>Puri adalah aplikasi sistem manajemen pemesanan.</ListItem>
          <ListItem>
            Aplikasi ini PWA-compliant, maka dapat diinstall di desktop maupun
            mobile.
          </ListItem>
          <ListItem>Seluruh data diupdate secara real-time.</ListItem>
          <ListItem>
            User dibagi menjadi 2 divisi, yakni <strong>Logistik</strong> dan{" "}
            <strong>Sales</strong>. Tampilan aplikasi berbeda untuk setiap
            divisi.
          </ListItem>
        </UnorderedList>

        <Heading variant="bantuan">Fitur Ekslusif Setiap Divisi</Heading>
        <Heading fontSize="18">Logistik</Heading>
        <UnorderedList>
          <ListItem>Mengubah status pesanan.</ListItem>
          <Image
            src={statusButton}
            alt="Change order status button"
            width="120px"
          />
        </UnorderedList>
        <Heading fontSize="18">Sales</Heading>
        <UnorderedList pb="4">
          <ListItem>
            Menerima push notification jika status pesanan diubah oleh divisi
            logistik.
          </ListItem>
          <ListItem>Menambahkan pelanggan atau pesanan baru.</ListItem>
          <Image src={addButton} alt="Add button" width="300px" />
        </UnorderedList>

        <Heading variant="bantuan">Ilustrasi</Heading>
        <Image src={usecase} alt="usecase" />
      </Stack>
    </ContentWrapper>
  );
}

export default HelpPage;
