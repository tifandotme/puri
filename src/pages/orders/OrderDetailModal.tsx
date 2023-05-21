import {
  Button,
  Icon,
  Link,
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
import { memo, useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { formatDateTime, formatPayment } from "../../utils/format";
import { getFullName } from "../../utils/misc";
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
      getFullName(order.sales).then((name) => setSales(name));
    }
  }, [order]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "lg" }}
      isCentered
      motionPreset="none"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detail Pesanan</ModalHeader>
        <ModalBody>
          <TableContainer
            h={{ base: "sm", md: "50vh" }}
            overflowY="scroll"
            whiteSpace="normal"
            border="1px solid"
            borderColor="gray.300"
          >
            <Table>
              <Tbody>
                <Tr>
                  <Td w="25%">Pelanggan</Td>
                  <Td fontWeight="bold">{order?.customer}</Td>
                </Tr>
                <Tr>
                  <Td>Jumlah</Td>
                  <Td>
                    {`${order?.qty.base}${
                      order?.qty.bonus ? "+" + order?.qty.bonus : " "
                    }`}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Barang</Td>
                  <Td>{order && productList[order.product]}</Td>
                </Tr>
                <Tr>
                  <Td>Pembayaran</Td>
                  <Td>{order?.payment && formatPayment(order.payment)}</Td>
                </Tr>
                <Tr>
                  <Td>Waktu Kirim</Td>
                  <Td>
                    {order?.scheduledTime &&
                      formatDateTime(order.scheduledTime)}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Lokasi</Td>
                  <Td>
                    {order?.location && (
                      <Link
                        href={order.location}
                        isExternal
                        color="blue.600"
                        fontWeight="bold"
                      >
                        {order.location
                          .replace(/^(https?:\/\/)?(www\.)?/i, "")
                          .replace(/\/$/, "")}
                        <Icon
                          as={FiArrowUpRight}
                          mx="2px"
                          boxSize="5"
                          verticalAlign="middle"
                        />
                      </Link>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Ket. Tambahan</Td>
                  <Td whiteSpace="normal">{order?.additionalInfo}</Td>
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
                      formatDateTime(order.createdAt, { isIncludeTime: true })}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="secondary" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default OrderDetailModal;
