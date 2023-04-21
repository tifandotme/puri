import { Button, HStack, Spinner, useToast } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { ref, remove } from "firebase/database";
import { useContext, useMemo } from "react";
import { CustomerListContext } from "../../App";
import { auth, database } from "../../config/firebase";
import { formatAddress } from "../../utils/utils";
import TanStackTable from "../TanStackTable";
import ContentWrapper from "../dashboard/ContentWrapper";

function EditCustomerPage() {
  const { customerList, isLoading } = useContext(CustomerListContext);

  const toast = useToast();

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
          <HStack>
            <Button
              size="sm"
              onClick={() => {
                console.log(row.original[0]);
              }}
              colorScheme="blue"
            >
              Edit
            </Button>
            <Button
              size="sm"
              onClick={async () => {
                await remove(ref(database, `customers/${row.original[0]}`));
                toast({
                  title: "Pelanggan berhasil dihapus",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              }}
              colorScheme="red"
            >
              Hapus
            </Button>
          </HStack>
        ),
      },
    ],
    []
  );

  const customerListMemo = useMemo(
    () =>
      // customerList is converted into array,
      // filtered by corresponding sales,
      // and then sorted by name
      Object.entries(customerList || {})
        .filter(([, { sales }]) => sales === auth.currentUser?.uid)
        .sort((a, b) => a[1].name.localeCompare(b[1].name)),
    [customerList]
  );

  return (
    <>
      <ContentWrapper title="Edit Pelanggan">
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
      </ContentWrapper>
    </>
  );
}

export default EditCustomerPage;