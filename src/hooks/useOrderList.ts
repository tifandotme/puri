import { User } from "firebase/auth";
import { child, get, onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../config/firebase";

/**
 * Get the list of orders from the database. This will only run when the user
 * has logged in, because only logged in user can read /orders database.
 *
 * Note: This is somewhat a copy of useCustomerList.ts,
 * but with the word "customer" replaced
 *
 * @param currentUser - The current user
 */
function useOrderList(currentUser: User | undefined) {
  const [orderList, setOrderList] = useState<OrderList | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const ordersRef = ref(database, "orders");
    const ordersQuery = query(ordersRef);

    const unsubscribe = onValue(
      ordersQuery,
      (snapshot) => {
        const orders: OrderList = snapshot.val();

        const promises: Array<Promise<void>> = [];

        for (const key in orders) {
          const customerUid = orders[key].customer;

          const promise = getCustomerName(customerUid).then((customerName) => {
            orders[key].customer = customerName;
          });

          promises.push(promise);
        }

        Promise.all(promises).then(() => {
          setOrderList(orders);
          setIsLoading(false);
        });
      },
      (error) => {
        console.error(error);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  return { orderList, isLoading };
}

async function getCustomerName(customerUid: string) {
  const snapshot = await get(
    child(ref(database, "customers"), `${customerUid}/name`)
  );
  return snapshot.val() as string;
}

export default useOrderList;
