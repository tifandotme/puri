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
import { User as UserAuth } from "firebase/auth";
import { useContext, useMemo, useRef } from "react";
import { FaEllipsisV, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { MdOutlineTextSnippet } from "react-icons/md";
import { TbPackage, TbPackageExport } from "react-icons/tb";
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

function OrderListPage({ user }: { user: UserAuth | undefined }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast({
    duration: 3000,
  });

  const selectedOrder = useRef<Order | undefined>(undefined);

  const { orderList, isLoading } = useContext(OrderListContext);
  const { userList } = useContext(UserListContext);

  const division = userList?.[user?.uid ?? ""]?.division;

  const columns = useMemo<ColumnDef<[string, Order], any>[]>(
    () => [
      {
        header: "",
        accessorKey: "status",
        minSize: 1,
        size: 1, // % table width
        meta: {
          bodyProps: {
            textAlign: "center",
          },
        },
        cell: ({ row }) => {
          const { isDelivered } = row.original[1];
          return (
            <Tooltip label={isDelivered ? "Sudah dikirim" : "Belum dikirim"}>
              <Text as="span">
                <Icon
                  verticalAlign="middle"
                  as={isDelivered ? TbPackageExport : TbPackage}
                  boxSize="6"
                  color={isDelivered ? "gray.700" : "red.500"}
                />
              </Text>
            </Tooltip>
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
        // accessorFn: (row) =>
        //   formatDateTime(row[1].createdAt, {
        //     isIncludeTime: true,
        //     isShortDate: true,
        //   }),
        meta: {
          headerProps: {
            display: { base: "none", lg: "table-cell" },
          },
          bodyProps: {
            display: { base: "none", lg: "table-cell" },
          },
        },
        cell: ({ row }) => {
          const now = new Date();
          const createdAt = new Date(row.original[1].createdAt);
          const diffTime = Math.abs(now.getTime() - createdAt.getTime());
          const isNew = diffTime <= 1000 * 60 * 60;
          return (
            <>
              <Text display="inline-block" mr="1" verticalAlign="middle">
                {formatDateTime(row.original[1].createdAt, {
                  isIncludeTime: true,
                  isShortDate: true,
                })}
              </Text>
              {isNew && (
                <Tooltip label="Baru ditambahkan < 1 jam">
                  <Badge variant="outline" colorScheme="red" userSelect="none">
                    BARU
                  </Badge>
                </Tooltip>
              )}
            </>
          );
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
    [division]
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
