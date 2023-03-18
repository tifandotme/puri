import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { onValue, ref } from "firebase/database";
import { useQuery } from "@tanstack/react-query";
import { useState, memo } from "react";
import { database } from "../../config/firebase";
import ContentWrapper from "../dashboard/ContentWrapper";

type Customer = {
  createdAt: number;
  address: {
    city: string;
    district: string;
    regency: string;
    street: string;
  };
  id: number;
  name: string;
  phone: number;
  phone2?: number;
  type: "individu" | "perusahaan";
};

type CustomerList = Record<string, Customer>;

function CustomerList() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, error } = useQuery(
    ["customerList"],
    async () => {
      const customersRef = ref(database, "customers");

      return new Promise<CustomerList>((resolve, reject) => {
        onValue(
          customersRef,
          (snapshot) => {
            resolve(snapshot.val() || {});
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
    { cacheTime: 5 * 60 * 1000 }
  );

  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined);

  return (
    <>
      <ContentWrapper
        title="Daftar Pelanggan"
        button={{ name: "Tambah Baru", path: "new" }}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Nama</Th>
                  <Th isNumeric>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.entries(data as Record<string, Customer>).map(
                  ([key, value]) => (
                    <Tr key={key}>
                      <Td>{value.name}</Td>
                      <Td isNumeric>
                        <Button
                          onClick={() => {
                            setSelectedCustomer(value);
                            onOpen();
                          }}
                        >
                          Detail
                        </Button>
                      </Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        {selectedCustomer && (
          <DetailModal
            isOpen={isOpen}
            onClose={onClose}
            customer={selectedCustomer}
          />
        )}
      </ContentWrapper>
    </>
  );
}

type DMProps = {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
};

const DetailModal = memo(function DM({ isOpen, onClose, customer }: DMProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{customer.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table variant="unstyled">
              <Tbody>
                <Tr>
                  <Td>
                    {customer.type === "perusahaan" ? "No NPWP" : "No KTP"}
                  </Td>
                  <Td>{customer.id}</Td>
                </Tr>
                <Tr>
                  <Td>No Telp</Td>
                  <Td isNumeric>{customer.phone}</Td>
                </Tr>
                <Tr>
                  <Td>No Telp 2</Td>
                  <Td isNumeric>{customer.phone2}</Td>
                </Tr>
                <Tr>
                  <Td>Alamat</Td>
                  <Td whiteSpace="normal">
                    {customer.address.street +
                      ", " +
                      customer.address.district +
                      ", " +
                      customer.address.regency +
                      ", " +
                      customer.address.city}
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
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default CustomerList;
