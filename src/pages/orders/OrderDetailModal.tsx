import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { child, get, ref } from "firebase/database";
import { memo, useEffect, useState } from "react";
import { database } from "../../config/firebase";
import { formatPayment } from "../../utils/utils";
import productList from "./product-list";

type OrderDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  order: Order | undefined;
};

/**
 * Modal to show order detail
 */
const OrderDetailModal = memo(function DM({
  isOpen,
  onClose,
  order,
}: OrderDetailModalProps) {
  const [sales, setSales] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (order) {
      get(child(ref(database, "users"), `${order?.sales}`)).then((snapshot) => {
        const name = snapshot.val().firstName + " " + snapshot.val().lastName;
        setSales(name);
      });
    }
  }, [order]);

  /**
   *   customer: string;
  qty: Qty;
  product: ProductList;
  additionalInfo?: string;
  cod?: Cod;
  scheduledTime?: number;
  location?: string;
  createdAt: TDate;
  sales: string;
};
   */

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detail Pesanan</ModalHeader>
        <ModalBody>
          <TableContainer>
            <Table variant="unstyled">
              <Tbody>
                <Tr>
                  <Td>Pelanggan</Td>
                  <Td fontWeight="bold" whiteSpace="normal">
                    {order?.customer}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Jumlah</Td>
                  <Td whiteSpace="normal">
                    {`${order?.qty.base}${
                      order?.qty.bonus ? "+" + order?.qty.bonus : " "
                    }`}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Barang</Td>
                  <Td whiteSpace="normal">
                    {order && productList[order.product]}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Pembayaran</Td>
                  <Td whiteSpace="normal">
                    {order && formatPayment(order.payment!)}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Waktu Kirim</Td>
                  <Td whiteSpace="normal">
                    {order &&
                      new Date(order.scheduledTime!).toLocaleDateString(
                        "en-GB"
                      )}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Lokasi</Td>
                  <Td whiteSpace="normal">{order?.location}</Td>
                </Tr>
                <Tr>
                  <Td>Sales</Td>
                  <Td whiteSpace="normal">
                    <Skeleton isLoaded={sales !== undefined}>{sales}</Skeleton>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Tanggal Dibuat</Td>
                  <Td whiteSpace="normal">
                    {order &&
                      new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default OrderDetailModal;
