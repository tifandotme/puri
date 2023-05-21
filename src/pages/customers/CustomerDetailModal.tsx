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
import { memo, useEffect, useState } from "react";
import { formatAddress, formatDateTime } from "../../utils/format";
import { getFullName } from "../../utils/misc";

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
      getFullName(customer.sales).then((name) => setSales(name));
    }
  }, [customer]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "lg" }}
      isCentered
      motionPreset="none"
    >
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
          <TableContainer
            h={{ base: "sm", md: "50vh" }}
            overflowY="scroll"
            whiteSpace="normal"
            border="1px solid"
            borderColor="gray.300"
          >
            <Table>
              <Tbody>
                <Tr>
                  <Td w="25%">Nama</Td>
                  <Td fontWeight="bold">{customer?.name}</Td>
                </Tr>
                <Tr>
                  <Td>
                    {customer?.type === "perusahaan" ? "No NPWP" : "No KTP"}
                  </Td>
                  <Td>{customer?.id}</Td>
                </Tr>
                <Tr>
                  <Td>No Telp</Td>
                  <Td>{customer?.phone}</Td>
                </Tr>
                <Tr>
                  <Td>No Telp 2</Td>
                  <Td>{customer?.phone2}</Td>
                </Tr>
                <Tr>
                  <Td>Alamat</Td>
                  <Td>{customer && formatAddress(customer.address)}</Td>
                </Tr>
                <Tr>
                  <Td>Sales</Td>
                  <Td>
                    <Skeleton isLoaded={sales !== undefined}>{sales}</Skeleton>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Tanggal Dibuat</Td>
                  <Td>
                    {customer &&
                      formatDateTime(customer.createdAt, {
                        isIncludeTime: true,
                      })}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="secondary" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default CustomerDetailModal;
