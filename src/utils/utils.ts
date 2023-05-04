import { child, get, ref } from "firebase/database";
import { database } from "../config/firebase";

function capitalizeWords(str: string): string {
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  return words.join(" ");
}

/**
 * Combine CustomerAddress object into a string
 */
function formatAddress(address: CustomerAddress): string {
  return `${address.street}, ${address.regency}, ${address.district}, ${address.city}`;
}

/**
 * Convert customer uid to customer name
 */
async function getCustomerName(customerUid: string): Promise<string> {
  const snapshot = await get(
    child(ref(database, "customers"), `${customerUid}/name`)
  );
  return snapshot.val();
}

/**
 * Format payment object into a string
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
 * Format epoch time into a date and time string
 * 
 * @param epoch Epoch time in milliseconds
 * @param isIncludeTime Whether to include time in the string
 * @param isShortDate Whether to use short date format
 */
function formatDateTime(epoch: number, isIncludeTime?: boolean, isShortDate?: boolean): string {
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

export {
  capitalizeWords,
  formatAddress,
  getCustomerName,
  formatPayment,
  formatDateTime,
};
