import { Button, Spinner } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useContext, useMemo } from "react";
import { OrderListContext } from "../../App";
import ContentWrapper from "../dashboard/ContentWrapper";
import productList from "./product-list";
import TanStackTable from "../TanStackTable";

function OrderListPage() {
  const { orderList, isLoading } = useContext(OrderListContext);

  const columns = useMemo<ColumnDef<[string, Order]>[]>(
    () => [
      {
        header: "Pelanggan",
        accessorKey: "customer",
        accessorFn: (row) => row[1].customer,
        size: 25, // % of table width
        meta: {
          bodyProps: {
            whiteSpace: "normal",
          },
        },
      },
      {
        header: "Barang",
        accessorKey: "product",
        accessorFn: (row) => productList[row[1].product],
        meta: {},
      },
      {
        header: "Jumlah",
        accessorKey: "qty",
        accessorFn: (row) => {
          const { base, bonus } = row[1].qty;
          let qty = `${base}`;
          if (bonus) qty += ` + ${bonus}`;
          return qty;
        },
      },
      {
        header: () => <center>Aksi</center>,
        accessorKey: "action",
        minSize: 4,
        size: 4, // % table width
        meta: {
          bodyProps: {
            textAlign: "center",
          },
        },
        cell: ({ row }) => (
          <Button
            size="sm"
            onClick={() => {
              console.log(row.original[1]);
            }}
            colorScheme="blue"
          >
            Detail
          </Button>
        ),
      },
    ],
    []
  );

  const orderListMemo = useMemo(
    () =>
      // orderList is converted into array,
      // and sorted by date
      Object.entries(orderList || {}).sort(
        (a, b) => a[1].createdAt - b[1].createdAt
      ),
    [orderList]
  );

  return (
    <>
      <ContentWrapper
        title="Daftar Pesanan"
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
          <TanStackTable data={orderListMemo} columns={columns} />
        )}
      </ContentWrapper>
    </>
  );
}

export default OrderListPage;
