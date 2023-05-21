import {
  Badge,
  ButtonGroup,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useContext, useMemo, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { HiArrowLeft, HiPencilSquare } from "react-icons/hi2";
import { MdOutlineTextSnippet } from "react-icons/md";
import { TbPackage, TbPackageExport } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import {
  formatDateTime,
  formatPayment,
  formatQtyProduct,
} from "../../utils/format";
import { OrderListContext } from "../ContextProviders";
import { ContentSpinner } from "../LoadingOverlay";
import TanStackTable from "../TanStackTable";
import ContentWrapper from "../dashboard/ContentWrapper";
import OrderDetailModal from "./OrderDetailModal";

function MyOrdersPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedOrder = useRef<Order | undefined>(undefined);

  const { orderList, isLoading } = useContext(OrderListContext);

  const navigate = useNavigate();

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
            overflow: "hidden",
            textOverflow: "ellipsis",
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
      // filtered by corresponding sales,
      // and sorted by date
      Object.entries(orderList || {})
        .filter(([, { sales }]) => sales === auth.currentUser?.uid)
        .sort((a, b) => b[1].createdAt - a[1].createdAt),
    [orderList]
  );

  return (
    <>
      {!isLoading ? (
        <ContentWrapper
          title="Pesanan Saya"
          icon={MdOutlineTextSnippet}
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

export default MyOrdersPage;
