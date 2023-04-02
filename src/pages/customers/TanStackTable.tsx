import {
  Button,
  ButtonGroup,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Table as TanstackTable, flexRender } from "@tanstack/react-table";

function TanStackTable<T>({ table }: { table: TanstackTable<T> }) {
  return (
    <>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    style={{
                      width:
                        header.getSize() !== 150
                          ? header.getSize() + "%"
                          : undefined,
                    }}
                    {...(header.index === 2 && {
                      display: { base: "none", lg: "table-cell" },
                    })}
                    {...(header.index === 0 && {
                      textAlign: "center",
                      paddingRight: 0,
                    })}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody fontSize="md">
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} {...cell.column.columnDef.meta}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Stack
        m="5"
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 0, lg: 7 }}
        justifyContent={{ base: "flex-start", lg: "space-between" }}
      >
        <HStack>
          <ButtonGroup colorScheme="blue" size="sm">
            <Button
              onClick={() => table.setPageIndex(0)}
              isDisabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </Button>
            <Button
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </Button>
            <Button
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
            >
              {">"}
            </Button>
            <Button
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
            >
              {">>"}
            </Button>
          </ButtonGroup>

          <InputGroup w="auto" size="sm">
            <InputLeftAddon>Ke Halaman: </InputLeftAddon>
            <Input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                if (page < table.getPageCount()) table.setPageIndex(page);
              }}
              w="3em"
            />
          </InputGroup>
        </HStack>
        <HStack>
          <Text fontSize="sm">
            Halaman{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} dari{" "}
              {table.getPageCount()}{" "}
            </strong>
          </Text>
          <Select
            w="auto"
            size="sm"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Lihat {pageSize}
              </option>
            ))}
          </Select>
        </HStack>
      </Stack>
    </>
  );
}

export default TanStackTable;
