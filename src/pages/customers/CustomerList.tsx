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
import { memo, useState } from "react";
import ContentWrapper from "../dashboard/ContentWrapper";
import useCustomerList from "../../hooks/useCustomerList";

function CustomerList() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { customerList, isLoading } = useCustomerList();

  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { data, isLoading, error } = useQuery(
  //   ["customers"],
  //   async () => {
  //     return new Promise<CustomerList>((resolve, reject) => {
  //       const customersRef = ref(database, "customers");

  //       onValue(
  //         customersRef,
  //         (snapshot) => {
  //           resolve(snapshot.val() || {});
  //           console.log("fetched");
  //         },
  //         (error) => {
  //           reject(error);
  //         }
  //       );
  //     });
  //   },
  //   {
  //     // staleTime: 3000,
  //     // notifyOnChangeProps: ["data"],
  //   }
  // );

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
                {customerList &&
                  Object.entries(customerList).map(([key, value]) => (
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
                  ))}
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
