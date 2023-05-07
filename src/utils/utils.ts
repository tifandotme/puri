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
 * Convert customer uid to customer name
 */
async function getCustomerName(customerUid: string): Promise<string> {
  const snapshot = await get(
    child(ref(database, "customers"), `${customerUid}/name`)
  );

  return snapshot.val();
}

/**
 * Convert sales uid to sales name
 */
async function getSalesName(salesUid: string): Promise<string> {
  const snapshot = await get(child(ref(database, "users"), `${salesUid}`));

  const { firstName, lastName } = snapshot.val();

  return `${firstName} ${lastName}`;
}

export { capitalizeWords, getCustomerName, getSalesName };
