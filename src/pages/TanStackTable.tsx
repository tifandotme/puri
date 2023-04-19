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
import {
  ColumnDef,
  Table as TTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TSTProps<Data extends any[], Columns extends ColumnDef<any, any>[]> = {
  data: Data;
  columns: Columns;
};

function TanStackTable<
  Data extends any[],
  Columns extends ColumnDef<any, any>[]
>({ data, columns }: TSTProps<Data, Columns>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return (
    <>
      <SearchBar table={table} />

      <TableContainer>
        <Table variant="striped">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    width={
                      header.getSize() !== 150
                        ? header.getSize() + "%"
                        : undefined
                    }
                    {...header.column.columnDef.meta?.headerProps}
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
                  <Td key={cell.id} {...cell.column.columnDef.meta?.bodyProps}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Pagination table={table} />
    </>
  );
}

function SearchBar<T>({ table }: { table: TTable<T> }) {
  return (
    <HStack my="4" mx="6" justifyContent="flex-start">
      <Input
        type="text"
        value={(table.getColumn("name")?.getFilterValue() ?? "") as string}
        onChange={(e) =>
          table.getColumn("name")?.setFilterValue(e.target.value)
        }
        placeholder="Cari Nama Pelanggan .."
        variant="flushed"
        _placeholder={{ color: "black", opacity: 0.8 }}
        w="60"
      />
    </HStack>
  );
}

function Pagination<T>({ table }: { table: TTable<T> }) {
  return (
    <Stack
      m="5"
      direction={{ base: "column", lg: "row" }}
      gap={{ base: 5, lg: 7 }}
      justifyContent={{ lg: "space-between" }}
      alignItems={{ base: "center" }}
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
  );
}

export default TanStackTable;
