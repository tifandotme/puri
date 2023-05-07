import {
  ButtonGroup,
  Icon,
  IconButton,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";

import { ColumnDef } from "@tanstack/react-table";
import { useContext, useMemo, useRef } from "react";
import { HiArrowLeft, HiPencilSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { CustomerListContext } from "../../App";
import { auth } from "../../config/firebase";
import { formatAddress } from "../../utils/format";
import TanStackTable from "../TanStackTable";
import ContentWrapper from "../dashboard/ContentWrapper";
import CustomerDetailModal from "./CustomerDetailModal";

function MyCustomersPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedCustomer = useRef<Customer | undefined>(undefined);

  const { customerList, isLoading } = useContext(CustomerListContext);

  const navigate = useNavigate();

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
          <ButtonGroup variant="link">
            <Tooltip label="Edit">
              <IconButton
                aria-label="Edit"
                icon={<Icon as={HiPencilSquare} boxSize="5" />}
                onClick={() => {
                  navigate("/customers/" + row.original[0]);
                }}
                colorScheme="green"
              />
            </Tooltip>
            <Tooltip label="Detail">
              <IconButton
                aria-label="Detail"
                icon={<Icon as={FaEllipsisV} boxSize="5" />}
                onClick={() => {
                  selectedCustomer.current = row.original[1];
                  onOpen();
                }}
                colorScheme="blue"
              />
            </Tooltip>
          </ButtonGroup>
        ),
      },
    ],
    [onOpen]
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
      <ContentWrapper
        title="Pelanggan Saya"
        button={[
          {
            name: "Kembali",
            path: "/customers",
            colorScheme: "gray",
            variant: "outline",
            leftIcon: <HiArrowLeft />,
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

        <CustomerDetailModal
          isOpen={isOpen}
          onClose={onClose}
          customer={selectedCustomer.current}
        />
      </ContentWrapper>
    </>
  );
}

export default MyCustomersPage;
