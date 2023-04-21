import { Button, Spinner, useDisclosure } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useContext, useMemo, useRef } from "react";
import { CustomerListContext } from "../../App";
import { formatAddress } from "../../utils/utils";
import TanStackTable from "../TanStackTable";
import ContentWrapper from "../dashboard/ContentWrapper";
import DetailModal from "./DetailModal";

function CustomerListPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { customerList, isLoading } = useContext(CustomerListContext);

  const selectedCustomer = useRef<Customer | undefined>(undefined);

  const columns = useMemo<ColumnDef<[string, Customer], any>[]>(
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
        {isLoading ? (
          <Spinner />
        ) : (
          <TanStackTable
            data={customerListMemo}
            columns={columns}
            search={{
              columnKey: "name",
              placeholder: "Cari nama pelanggan ..",
            }}
          />
        )}

        <DetailModal
          isOpen={isOpen}
          onClose={onClose}
          selectedCustomer={selectedCustomer.current}
        />
      </ContentWrapper>
    </>
  );
}

export default CustomerListPage;
