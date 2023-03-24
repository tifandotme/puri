import {
  Button,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { ref, remove } from "firebase/database";
import { useContext } from "react";
import { AppContext } from "../../App";
import { auth, database } from "../../config/firebase";
import ContentWrapper from "../dashboard/ContentWrapper";

function RemoveCustomer() {
  const { customerList, isLoading } = useContext(AppContext);

  const toast = useToast();

  return (
    <>
      <ContentWrapper title="Ubah Pelanggan">
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Nama</Th>
                  <Th isNumeric>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {customerList &&
                  Object.entries(customerList)
                    .reverse()
                    .filter(([, { sales }]) => sales === auth.currentUser?.uid)
                    .map(([key, value]) => (
                      <Tr key={key}>
                        <Td>{value.name}</Td>
                        <Td isNumeric>
                          <Button
                            colorScheme="red"
                            onClick={async () => {
                              await remove(ref(database, `customers/${key}`));
                              toast({
                                title: "Pelanggan berhasil dihapus",
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                              });
                            }}
                          >
                            Hapus
                          </Button>
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </ContentWrapper>
    </>
  );
}

export default RemoveCustomer;
