import { User } from "firebase/auth";
import { onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../config/firebase";
import { getSalesName } from "../utils/utils";

/**
 * Get the list of customers from the database. This will only run when the user
 * has logged in, because only logged in user can read /customers database.
 *
 * @param user Current logged-in user
 */
function useCustomerList(user?: User) {
  const [customerList, setCustomerList] = useState<CustomerList | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }

    const customersRef = ref(database, "customers");
    const customersQuery = query(customersRef);

    // const unsubscribe = onValue(
    //   customersQuery,
    //   (snapshot) => {
    //     setCustomerList(snapshot.val());
    //     setIsLoading(false);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );

    const unsubscribe = onValue(
      customersQuery,
      (snapshot) => {
        const promises: Array<Promise<void>> = [];

        const customers: CustomerList | undefined = snapshot.val() || undefined;
        if (customers) {
          for (const key in customers) {
            const salesUid = customers[key].sales;

            const promise = getSalesName(salesUid).then((name) => {
              customers[key].salesName = name;
            });

            promises.push(promise);
          }
        }

        Promise.all(promises).then(() => {
          setCustomerList(customers);
          setIsLoading(false);
        });
      },
      (error) => {
        console.error(error);
      }
    );

    return unsubscribe;
  }, [user]);

  return { customerList, isLoading };
}

export default useCustomerList;
