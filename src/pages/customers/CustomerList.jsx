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
import { off, onValue, ref } from "firebase/database";
import { useEffect, useState, memo } from "react";
import { database } from "../../config/firebase";
import DashboardContentWrapper from "../DashboardContentWrapper";
import { useQuery } from "@tanstack/react-query";

function CustomerList() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading, error } = useQuery(
    ["customerList"],
    () => {
      const customersRef = ref(database, "customers");

      return new Promise((resolve, reject) => {
        onValue(customersRef, (snapshot) => {
          resolve(snapshot.val() || {});
        });

        // return () => off(customersRef);
      });
    },
    { cacheTime: 5 * 60 * 1000 }
  );

  // const [customerList, setCustomerList] = useState(undefined);
  const [selectedCustomer, setSelectedCustomer] = useState(undefined);

  // useEffect(() => {
  //   const customersRef = ref(database, "customers");

  //   console.log("buat efek bosque");

  //   onValue(customersRef, (snapshot) => {
  //     setCustomerList(snapshot.val() || {});
  //   });

  //   return () => off(customersRef);
  // }, []);

  // data && console.log(data);

  return (
    <>
      <DashboardContentWrapper
        title="Daftar Pelanggan"
        button={{ name: "Tambah", path: "new" }}
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
                {Object.entries(data).map(([key, value]) => (
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
      </DashboardContentWrapper>
    </>
  );
}

const DetailModal = memo(function DetailModal({ isOpen, onClose, customer }) {
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
