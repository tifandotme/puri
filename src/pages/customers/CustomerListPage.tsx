import { Icon, IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useContext, useMemo, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { auth } from "../../config/firebase";
import { formatAddress } from "../../utils/format";
import { CustomerListContext, UserListContext } from "../ContextProviders";
import { ContentSpinner } from "../LoadingOverlay";
import TanStackTable from "../TanStackTable";
import ContentWrapper from "../dashboard/ContentWrapper";
import CustomerDetailModal from "./CustomerDetailModal";

function CustomerListPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedCustomer = useRef<Customer | undefined>(undefined);

  const { customerList, isLoading } = useContext(CustomerListContext);
  const { userList } = useContext(UserListContext);

  const division = userList ? userList[auth.currentUser!.uid].division : "";

  // added salesName from the uid to full name conversion in useCustomerList
  const columns = useMemo<
    ColumnDef<[string, Customer & { salesName: string }], any>[]
  >(
    () => [
      {
        header: "Nama",
        accessorKey: "name",
        accessorFn: (row) => row[1].name,
        size: 25, // % of table width
        meta: {
          bodyProps: {
            whiteSpace: "normal",
          },
        },
      },
      {
        header: "Alamat",
        accessorKey: "address",
        accessorFn: (row) => formatAddress(row[1].address),
        meta: {
          headerProps: {
            display: { base: "none", lg: "table-cell" },
          },
          bodyProps: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: { base: "none", lg: "table-cell" },
            maxW: "100px",
          },
        },
      },
      {
        header: "Sales",
        accessorKey: "sales",
        maxSize: 15,
        accessorFn: (row) => row[1].salesName,
        meta: {
          headerProps: {
            display: { base: "none", lg: "table-cell" },
          },
          bodyProps: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: { base: "none", lg: "table-cell" },
          },
        },
      },
      {
        header: () => <center>Aksi</center>,
        accessorKey: "action",
        minSize: 4,
        size: 4, // % of table width
        meta: {
          bodyProps: {
            textAlign: "center",
          },
        },
        cell: ({ row }) => (
          <Tooltip label="Detail">
            <IconButton
              aria-label="Detail"
              icon={<Icon as={FaEllipsisV} boxSize="5" />}
              onClick={() => {
                selectedCustomer.current = row.original[1];
                onOpen();
              }}
              colorScheme="secondary"
              variant="link"
            />
          </Tooltip>
        ),
      },
    ],
    [] // tadinya onOpen, sama dgn OrderListPage, kenapa ya?
  );

  const customerListMemo = useMemo(
    () =>
      // customerList is converted into array,
      // and then sorted by name
      Object.entries(customerList || {}).sort((a, b) =>
        a[1].name.localeCompare(b[1].name)
      ),
    [customerList]
  );

  return (
    <>
      {!isLoading && userList !== undefined ? (
        <ContentWrapper
          title="Daftar Pelanggan"
          icon={MdGroup}
          button={
            division === "sales"
              ? [
                  {
                    name: "Pelanggan Saya",
                    path: "my-customers",
                    colorScheme: "gray",
                    variant: "outline",
                  },
                  {
                    name: "Tambah Baru",
                    path: "new",
                    colorScheme: "secondary",
                  },
                ]
              : undefined
          }
        >
          <TanStackTable
            data={customerListMemo}
            columns={columns}
            search={{
              columnKey: "name",
              placeholder: "Cari nama pelanggan ..",
            }}
          />

          <CustomerDetailModal
            isOpen={isOpen}
            onClose={onClose}
            customer={selectedCustomer.current}
          />
        </ContentWrapper>
      ) : (
        <ContentSpinner />
      )}
    </>
  );
}

export default CustomerListPage;
