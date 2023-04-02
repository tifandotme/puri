import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { child, get, ref } from "firebase/database";
import { memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../../App";
import { database } from "../../config/firebase";
import { formatAddress } from "../../utils/utils";
import ContentWrapper from "../dashboard/ContentWrapper";
import TanStackTable from "./TanStackTable";

// TODO: create an API to generate randomize customer list?
function CustomerList() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { customerList, isLoading } = useContext(AppContext);

  const selectedCustomer = useRef<Customer<string> | undefined>(undefined);

  // const toast = useToast();
  // const isFirstCall = useRef(true);
  // useEffect(() => {
  //   const customersRef = ref(database, "customers");
  //   const customersQuery = query(customersRef, limitToLast(1));

  //   const unsubscribe = onChildAdded(customersQuery, (snapshot) => {
  //     if (isFirstCall.current) {
  //       isFirstCall.current = false;
  //       return;
  //     }

  //     if (snapshot.exists()) {
  //       toast({
  //         title: "Pelanggan baru ditambahkan",
  //         description: `${
  //           snapshot.val().name
  //         } telah ditambahkan ke daftar pelanggan`,
  //         status: "info",
  //         duration: 10000,
  //         isClosable: true,
  //       });
  //     }
  //   });

  //   return unsubscribe;
  // }, [toast]);

  const columns = useMemo<ColumnDef<[string, Customer<string>]>[]>(
    () => [
      {
        header: "No",
        cell: ({ row }) => row.index + 1 + ".",
        minSize: 1,
        size: 1,
        meta: {
          textAlign: "center",
          paddingRight: 0,
        },
      },
      {
        header: "Nama",
        accessorKey: "name",
        accessorFn: (row) => row[1].name,
        size: 25,
        meta: {
          whiteSpace: "normal",
        },
      },
      {
        header: "Alamat",
        accessorKey: "address",
        accessorFn: (row) => formatAddress(row[1].address),
        // size: 30,
        meta: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: { base: "none", lg: "table-cell" },
          maxW: "100px",
        },
      },
      {
        header: () => <center>Aksi</center>,
        accessorKey: "action",
        minSize: 4,
        size: 4,
        meta: {
          textAlign: "center",
        },
        cell: ({ row }) => (
          <Button
            size="sm"
            onClick={() => {
              selectedCustomer.current = row.original[1];
              onOpen();
            }}
            colorScheme="blue"
          >
            Detail
          </Button>
        ),
      },
    ],
    [onOpen]
  );

  const customerListMemo = useMemo(
    () => Object.entries(customerList || {}),
    [customerList]
  );

  const table = useReactTable({
    data: customerListMemo,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

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
            colorScheme: "green",
          },
        ]}
      >
        {isLoading ? <Spinner /> : <TanStackTable table={table} />}

        <DetailModal
          isOpen={isOpen}
          onClose={onClose}
          selectedCustomer={selectedCustomer.current}
        />
      </ContentWrapper>
    </>
  );
}

type DMProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCustomer: Customer<string> | undefined;
};

const DetailModal = memo(function DM({
  isOpen,
  onClose,
  selectedCustomer: customer,
}: DMProps) {
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Detail Pelanggan
          <Badge
            backgroundColor={
              customer?.type === "individu" ? "green.200" : "blue.200"
            }
            marginLeft="2"
          >
            {customer?.type}
          </Badge>
        </ModalHeader>
        <ModalCloseButton />
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

export default CustomerList;
