import {
  Badge,
  ButtonGroup,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useContext, useMemo, useRef } from "react";
import { FaEllipsisV, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { MdOutlineTextSnippet } from "react-icons/md";
import { auth } from "../../config/firebase";
import {
  formatDateTime,
  formatPayment,
  formatQtyProduct,
} from "../../utils/format";
import { OrderListContext, UserListContext } from "../ContextProviders";
import { ContentSpinner } from "../LoadingOverlay";
import TanStackTable from "../TanStackTable";
import ContentWrapper from "../dashboard/ContentWrapper";
import OrderDetailModal from "./OrderDetailModal";
import { handleToggleDelivery } from "./handle-order";

function OrderListPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast({
    duration: 3000,
  });

  const selectedOrder = useRef<Order | undefined>(undefined);

  const { orderList, isLoading } = useContext(OrderListContext);
  const { userList } = useContext(UserListContext);

  const division = userList ? userList[auth.currentUser!.uid].division : "";

  const columns = useMemo<ColumnDef<[string, Order], any>[]>(
    () => [
      {
        header: "Pelanggan",
        accessorKey: "customer",
        // accessorFn: (row) => row[1].customer,
        size: 25, // % of table width
        meta: {
          bodyProps: {
            whiteSpace: "normal",
          },
        },
        cell: ({ row }) => {
          const now = new Date();
          const createdAt = new Date(row.original[1].createdAt);

          const diffTime = Math.abs(now.getTime() - createdAt.getTime());
          const isNew = diffTime <= 1000 * 60 * 60;

          const { customer, isDelivered } = row.original[1];
          return (
            <>
              <Text
                display="inline-block"
                mr="1"
                verticalAlign="middle"
                color={isDelivered ? "green.500" : "none"}
                fontWeight={isDelivered ? "600" : "none"}
              >
                {customer}
              </Text>
              {isDelivered && (
                <Tooltip label="Terkirim">
                  <Badge
                    fontSize="1.4rem"
                    boxShadow="none"
                    variant="outline"
                    colorScheme="green"
                  >
                    ✔
                  </Badge>
                </Tooltip>
              )}
              {isNew && (
                <Badge variant="outline" colorScheme="red">
                  BARU
                </Badge>
              )}
            </>
          );
        },
      },
      {
        header: "Barang",
        accessorKey: "product",
        size: 25, // % of table width
        accessorFn: (row) => formatQtyProduct(row[1].qty, row[1].product),
        meta: {
          bodyProps: { whiteSpace: "normal" },
        },
      },
      {
        header: "Pembayaran",
        accessorKey: "payment",
        size: 25, // % of table width
        accessorFn: (row) =>
          row[1].payment ? formatPayment(row[1].payment) : "",
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
            {division === "logistik" && (
              <Tooltip label="Ubah status">
                <IconButton
                  aria-label="Edit"
                  icon={
                    <Icon
                      as={
                        row.original[1].isDelivered ? FaToggleOn : FaToggleOff
                      }
                      boxSize="6"
                    />
                  }
                  onClick={() => handleToggleDelivery(row.original, toast)}
                  colorScheme={row.original[1].isDelivered ? "green" : "red"}
                />
              </Tooltip>
            )}
            <Tooltip label="Detail">
              <IconButton
                aria-label="Detail"
                icon={<Icon as={FaEllipsisV} boxSize="5" />}
                onClick={() => {
                  selectedOrder.current = row.original[1];
                  onOpen();
                }}
                colorScheme="secondary"
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
      // and sorted by date
      Object.entries(orderList || {}).sort(
        (a, b) => b[1].createdAt - a[1].createdAt
      ),
    [orderList]
  );

  return (
    <>
      {!isLoading && userList !== undefined ? (
        <ContentWrapper
          title="Daftar Pesanan"
          icon={MdOutlineTextSnippet}
          button={
            division === "sales"
              ? [
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
                ]
              : undefined
          }
        >
          <TanStackTable data={orderListMemo} columns={columns} />

          <OrderDetailModal
            isOpen={isOpen}
            onClose={onClose}
            order={selectedOrder.current}
          />
        </ContentWrapper>
      ) : (
        <ContentSpinner />
      )}
    </>
  );
}

export default OrderListPage;
