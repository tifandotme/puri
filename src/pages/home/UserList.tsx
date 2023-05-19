import {
  Avatar,
  AvatarGroup,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";

type UserListProps = {
  data: UserList;
  isLoading: boolean;
};

function UserList({ data, isLoading }: UserListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selection = useRef("Divisi Sales");

  return (
    <Stack justify="space-between" h="full">
      <Text fontWeight="bold">Daftar Pengguna</Text>
      <Stack h="8.5rem" justify="flex-end" align="flex-start" gap={1}>
        <AvatarGroup size="md" max={3}>
          <Avatar bg="blue.400" />
          <Avatar bg="green.400" />
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <Stack>
          {["Divisi Sales", "Divisi Logistik"].map((divisi) => (
            <Button
              onClick={() => {
                onOpen();
                selection.current = divisi;
              }}
              key={divisi}
              style={{
                marginTop: "0",
              }}
              maxW="max-content"
              size="sm"
              variant="ghost"
              leftIcon={<BsFillPersonLinesFill size={19} />}
            >
              {divisi}
            </Button>
          ))}
        </Stack>
      </Stack>
      <UserListModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}

type UserListModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function UserListModal({ isOpen, onClose }: UserListModalProps) {
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
                  <Td>Tes</Td>
                  <Td fontWeight="bold" whiteSpace="normal">
                    Tes2
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
}

export default UserList;
