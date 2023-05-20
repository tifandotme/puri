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
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { memo, useContext, useMemo } from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { UserListContext } from "../ContextProviders";

function UserList() {
  const { userList } = useContext(UserListContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack justify="space-between" h="full">
      <Text fontWeight="bold">Daftar Pengguna</Text>
      <Stack h="8rem" justify="flex-end" align="flex-start" gap={2}>
        {userList ? (
          <AvatarGroup size="lg" max={3} userSelect="none">
            {Object.values(userList).map(
              ({ firstName, lastName, email }, idx) => (
                <Avatar
                  key={email}
                  bg={["blue.300", "green.300", "red.300"][idx]}
                  color="white"
                  name={firstName + " " + lastName}
                />
              )
            )}
          </AvatarGroup>
        ) : (
          <Skeleton h="12" w="28" />
        )}
        <Skeleton isLoaded={userList !== undefined}>
          <Button
            onClick={onOpen}
            style={{
              marginTop: "-5px",
            }}
            maxW="max-content"
            variant="ghost"
            fontSize="0.9rem"
            px="1"
            mb="-2px"
            leftIcon={<BsFillPersonLinesFill size={19} />}
          >
            Lihat Semua
          </Button>
        </Skeleton>
      </Stack>
      <UserListModal isOpen={isOpen} onClose={onClose} userList={userList} />
    </Stack>
  );
}

type UserListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userList?: UserList;
};

const UserListModal = memo(function UserListModal({
  isOpen,
  onClose,
  userList,
}: UserListModalProps) {
  // filtered userList based on division
  const list = useMemo(() => {
    if (!userList) return;

    const sales = Object.values(userList).filter(
      ({ division }) => division === "sales"
    );
    const logistik = Object.values(userList).filter(
      ({ division }) => division === "logistik"
    );

    return { sales, logistik };
  }, [userList]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "lg" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Daftar Pengguna</ModalHeader>
        <ModalBody>
          <Tabs isFitted variant="line">
            <TabList>
              <Tab>Sales</Tab>
              <Tab>Logistik</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UsersTable list={list?.sales} />
              </TabPanel>
              <TabPanel>
                <UsersTable list={list?.logistik} />
              </TabPanel>
            </TabPanels>
          </Tabs>
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

function UsersTable({ list }: { list: User[] | undefined }) {
  return (
    <TableContainer
      h={{ base: "70vh", md: "50vh" }}
      overflowY="scroll"
      whiteSpace="normal"
      border="1px solid"
      borderColor="gray.300"
    >
      <Table size="md">
        <Thead fontWeight="600" bg="gray.50" position="sticky" top="0">
          <Tr>
            <Td py="3" w="45%">
              Nama
            </Td>
            <Td py="3">Email</Td>
          </Tr>
        </Thead>
        <Tbody>
          {list?.map(({ firstName, lastName, email }) => (
            <Tr key={email}>
              <Td py="3" w="45%">{`${firstName} ${
                lastName ? lastName : ""
              }`}</Td>
              <Td py="3">{email}</Td>
            </Tr>
          ))}

          {/* {Array(30)
            .fill("")
            .map((_, idx) => (
              <Tr key={idx}>
                <Td>Foo Foo Foo Foo Foo Foo Foo</Td>
                <Td>Bar</Td>
              </Tr>
            ))} */}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default UserList;
