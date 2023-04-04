import "@tanstack/react-table";

// https://github.com/TanStack/table/discussions/4157
declare module "@tanstack/react-table" {
  interface ColumnMeta {
    headerProps?: Record<string, any>;
    bodyProps?: Record<string, any>;
  }
}
