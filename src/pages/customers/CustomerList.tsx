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
  useToast,
} from "@chakra-ui/react";
import { memo, MutableRefObject, useContext, useEffect, useRef } from "react";
import ContentWrapper from "../dashboard/ContentWrapper";
import { AppContext } from "../../App";
import { query, ref, limitToLast, onChildAdded } from "firebase/database";
import { database } from "../../config/firebase";

function CustomerList() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { customerList, isLoading } = useContext(AppContext);

  const selectedCustomer = useRef<Customer | undefined>(undefined);

  const toast = useToast();
  const isFirstCall = useRef(true);
  useEffect(() => {
    const customersRef = ref(database, "customers");
    const customersQuery = query(customersRef, limitToLast(1));

    const unsubscribe = onChildAdded(customersQuery, (snapshot) => {
      if (isFirstCall.current) {
        isFirstCall.current = false;
        return;
      }

      if (snapshot.exists()) {
        toast({
          title: "Pelanggan baru ditambahkan",
          description: `${
            snapshot.val().name
          } telah ditambahkan ke daftar pelanggan`,
          status: "info",
          duration: 10000,
          isClosable: true,
        });
      }
    });

    return unsubscribe;
  }, [toast]);

  return (
    <>
      <ContentWrapper
        title="Daftar Pelanggan"
        button={[
          {
            name: "Edit",
            path: "edit",
            colorScheme: "gray",
            variant: "outline",
          },
          {
            name: "Tambah Baru",
            path: "new",
            colorScheme: "gray",
          },
        ]}
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
                  Object.entries(customerList)
                    .reverse()
                    .map(([key, value]) => (
                      <Tr key={key}>
                        <Td>{value.name}</Td>
                        <Td isNumeric>
                          <Button
                            onClick={() => {
                              selectedCustomer.current = value;
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
        <DetailModal
          isOpen={isOpen}
          onClose={onClose}
          selectedCustomer={selectedCustomer}
        />
      </ContentWrapper>
    </>
  );
}

type DMProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCustomer: MutableRefObject<Customer | undefined>;
};

const DetailModal = memo(function DM({
  isOpen,
  onClose,
  selectedCustomer,
}: DMProps) {
  const customer: Customer | undefined = selectedCustomer.current;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{customer?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table variant="unstyled">
              <Tbody>
                <Tr>
                  <Td>
                    {customer?.type === "perusahaan" ? "No NPWP" : "No KTP"}
                  </Td>
                  <Td>{customer?.id}</Td>
                </Tr>
                <Tr>
                  <Td>No Telp</Td>
                  <Td isNumeric>{customer?.phone}</Td>
                </Tr>
                <Tr>
                  <Td>No Telp 2</Td>
                  <Td isNumeric>{customer?.phone2}</Td>
                </Tr>
                <Tr>
                  <Td>Alamat</Td>
                  <Td whiteSpace="normal">
                    {customer?.address.street +
                      ", " +
                      customer?.address.district +
                      ", " +
                      customer?.address.regency +
                      ", " +
                      customer?.address.city}
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

export default CustomerList;
