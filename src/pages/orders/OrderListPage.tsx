import {
  Icon,
  IconButton,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useContext, useMemo, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { OrderListContext } from "../../App";
import { formatDateTime, formatPayment } from "../../utils/utils";
import TanStackTable from "../TanStackTable";
import ContentWrapper from "../dashboard/ContentWrapper";
import OrderDetailModal from "./OrderDetailModal";
import productList from "./product-list";

function OrderListPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedOrder = useRef<Order | undefined>(undefined);

  const { orderList, isLoading } = useContext(OrderListContext);

  const columns = useMemo<ColumnDef<[string, Order], any>[]>(
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
        size: 25, // % of table width
        accessorFn: (row) => {
          const { base, bonus } = row[1].qty;
          const product = productList[row[1].product];
          let qty = `${base}`;
          if (bonus) qty += `+${bonus}`;

          return (
            qty + " " + product.slice(product.indexOf(" "), product.length)
          );
        },
        meta: {
          bodyProps: { whiteSpace: "normal" },
        },
      },
      {
        header: "Pembayaran",
        accessorKey: "payment",
        size: 25, // % of table width
        accessorFn: (row) => {
          if (row[1].payment) {
            return formatPayment(row[1].payment);
          } else {
            return " ";
          }
        },
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
        header: "Ditambahkan",
        accessorKey: "date",
        size: 25, // % of table width
        accessorFn: (row) => formatDateTime(row[1].createdAt, true, true),
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
        size: 4, // % table width
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
                selectedOrder.current = row.original[1];
                onOpen();
              }}
              colorScheme="secondary"
              variant="link"
            />
          </Tooltip>
        ),
      },
    ],
    [onOpen]
  );

  const orderListMemo = useMemo(
    () =>
      // orderList is converted into array,
      // and sorted by date
      Object.entries(orderList || {}).sort(
        (a, b) => b[1].createdAt - a[1].createdAt
      ),
    [orderList]
  );

  return (
    <>
      <ContentWrapper
        title="Daftar Pesanan"
        button={[
          {
            name: "Pesanan Saya",
            path: "my-orders",
            colorScheme: "gray",
            variant: "outline",
          },
          {
            name: "Tambah Baru",
            path: "new",
            colorScheme: "secondary",
          },
        ]}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <TanStackTable data={orderListMemo} columns={columns} />
        )}

        <OrderDetailModal
          isOpen={isOpen}
          onClose={onClose}
          order={selectedOrder.current}
        />
      </ContentWrapper>
    </>
  );
}

export default OrderListPage;
