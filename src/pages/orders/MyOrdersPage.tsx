import {
  ButtonGroup,
  Icon,
  IconButton,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useContext, useMemo, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { HiArrowLeft, HiPencilSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { OrderListContext } from "../../App";
import { auth } from "../../config/firebase";
import { formatDateTime, formatPayment } from "../../utils/format";
import TanStackTable from "../TanStackTable";
import ContentWrapper from "../dashboard/ContentWrapper";
import OrderDetailModal from "./OrderDetailModal";
import productList from "./product-list";

function MyOrdersPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedOrder = useRef<Order | undefined>(undefined);

  const { orderList, isLoading } = useContext(OrderListContext);

  const navigate = useNavigate();

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
        accessorFn: (row) =>
          formatDateTime(row[1].createdAt, {
            isIncludeTime: true,
            isShortDate: true,
          }),
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
          <ButtonGroup variant="link">
            <Tooltip label="Edit">
              <IconButton
                aria-label="Edit"
                icon={<Icon as={HiPencilSquare} boxSize="5" />}
                onClick={() => {
                  navigate("/orders/" + row.original[0]);
                }}
                colorScheme="green"
              />
            </Tooltip>
            <Tooltip label="Detail">
              <IconButton
                aria-label="Detail"
                icon={<Icon as={FaEllipsisV} boxSize="5" />}
                onClick={() => {
                  selectedOrder.current = row.original[1];
                  onOpen();
                }}
                colorScheme="blue"
              />
            </Tooltip>
          </ButtonGroup>
        ),
      },
    ],
    []
  );

  const orderListMemo = useMemo(
    () =>
      // orderList is converted into array,
      // filtered by corresponding sales,
      // and sorted by date
      Object.entries(orderList || {})
        .filter(([, { sales }]) => sales === auth.currentUser?.uid)
        .sort((a, b) => b[1].createdAt - a[1].createdAt),
    [orderList]
  );

  return (
    <>
      <ContentWrapper
        title="Pesanan Saya"
        button={[
          {
            name: "Kembali",
            path: "/orders",
            colorScheme: "gray",
            variant: "outline",
            leftIcon: <HiArrowLeft />,
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

export default MyOrdersPage;
