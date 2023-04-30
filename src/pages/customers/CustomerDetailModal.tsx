import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { child, get, ref } from "firebase/database";
import { memo, useEffect, useState } from "react";
import { database } from "../../config/firebase";
import { formatAddress } from "../../utils/utils";

type CustomerDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | undefined;
};

/**
 * Modal to show customer detail
 */
const CustomerDetailModal = memo(function DM({
  isOpen,
  onClose,
  customer,
}: CustomerDetailModalProps) {
  const [sales, setSales] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (customer) {
      get(child(ref(database, "users"), `${customer?.sales}`)).then(
        (snapshot) => {
          const name = snapshot.val().firstName + " " + snapshot.val().lastName;
          setSales(name);
        }
      );
    }
  }, [customer]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Detail Pelanggan
          <Badge
            backgroundColor={
              customer?.type === "individu" ? "green.200" : "blue.200"
            }
            marginLeft="2"
            fontSize="sm"
          >
            {customer?.type}
          </Badge>
        </ModalHeader>
        <ModalBody>
          <TableContainer>
            <Table variant="unstyled">
              <Tbody>
                <Tr>
                  <Td>Nama</Td>
                  <Td fontWeight="bold" whiteSpace="normal">
                    {customer?.name}
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    {customer?.type === "perusahaan" ? "No NPWP" : "No KTP"}
                  </Td>
                  <Td whiteSpace="normal">{customer?.id}</Td>
                </Tr>
                <Tr>
                  <Td>No Telp</Td>
                  <Td whiteSpace="normal" isNumeric>
                    {customer?.phone}
                  </Td>
                </Tr>
                <Tr>
                  <Td>No Telp 2</Td>
                  <Td whiteSpace="normal" isNumeric>
                    {customer?.phone2}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Alamat</Td>
                  <Td whiteSpace="normal">
                    {customer && formatAddress(customer.address)}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Sales</Td>
                  <Td whiteSpace="normal">
                    <Skeleton isLoaded={sales !== undefined}>{sales}</Skeleton>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Tanggal Dibuat</Td>
                  <Td whiteSpace="normal">
                    {customer &&
                      new Date(customer.createdAt).toLocaleDateString("en-GB")}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default CustomerDetailModal;
