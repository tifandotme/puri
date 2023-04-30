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

export { capitalizeWords, formatAddress, getCustomerName, formatPayment };
