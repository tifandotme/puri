declare module "territory-indonesia" {
  export function uCase(str: string): string;
  export function arrObj<T>(arr: T[]): T | Undefined;
  export function normalizeName<T extends { name: string }>(data: T | T[]): T;
}
