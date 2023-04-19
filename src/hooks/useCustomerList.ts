import { User } from "firebase/auth";
import { onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../config/firebase";

/**
 * Get the list of customers from the database. This will only run when the user
 * has logged in, because only logged in user can read /customers database.
 *
 * @param user Current logged-in user
 */
function useCustomerList(user: User | undefined) {
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

    const unsubscribe = onValue(
      customersQuery,
      (snapshot) => {
        setCustomerList(snapshot.val());
        setIsLoading(false);
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
