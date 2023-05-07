import productList from "../pages/orders/product-list";

/**
 * Combine CustomerAddress object into a string.
 */
function formatAddress(address: CustomerAddress): string {
  return `${address.street}, ${address.village}, ${address.district}, ${address.regency}`;
}

/**
 * Format payment object into a string.
 *
 * Additional info on payment type:
 * - BU: Bayar Uang (Cash), similar to Cash on Delivery
 * - KU: Kredit Uang (Credit), similar to Bank Transfer
 */
function formatPayment(payment: Payment): string {
  const { amount, type } = payment;

  const formattedType = type === "cash" ? "BU" : "KU";
  const formattedAmount = amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return `${formattedAmount} (${formattedType})`;
}

/**
 * Format epoch time (ms) into a date and time string.
 *
 * @param epoch Epoch time in milliseconds.
 * @param isIncludeTime Whether to include time in the string.
 * @param isShortDate Whether to use short date format.
 *
 * @example "Senin, 1 Januari 2021 12.00" (isIncludeTime = true)
 * @example "Senin, 1 Januari 2021" (isIncludeTime = false)
 * @example "1/1/2021 12.00" (isIncludeTime = true, isShortDate = true)
 * @example "1/1/2021" (isIncludeTime = false, isShortDate = true)
 */
function formatDateTime(
  epoch: number,
  options?: {
    isIncludeTime?: boolean;
    isShortDate?: boolean;
  }
): string {
  const { isIncludeTime, isShortDate } = options || {};

  const date = new Date(epoch);

  const formattedDate = date.toLocaleDateString("id-ID", {
    ...(!isShortDate && { weekday: "long" }),
    year: "numeric",
    ...(!isShortDate ? { month: "long" } : { month: "numeric" }),
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isIncludeTime) {
    return `${formattedDate} ${formattedTime}`;
  } else {
    return formattedDate;
  }
}

/**
 * Format qty and product into a string.
 *
 * @example "200+4 Serba Guna"
 */
function formatQtyProduct(qty: Qty, product: ProductList): string {
  const { base, bonus } = qty;

  const productName = productList[product];

  const formattedQty = bonus ? `${base}+${bonus}` : `${base}`;
  const formattedProduct = productName.slice(
    productName.indexOf(" "),
    productName.length
  );

  return `${formattedQty} ${formattedProduct}`;
}

export { formatAddress, formatPayment, formatDateTime, formatQtyProduct };
