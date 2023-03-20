import { onValue, ref } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import { database } from "../config/firebase";

function useCustomerList() {
  const [customerList, setCustomerList] = useState<CustomerList | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const customersRef = ref(database, "customers");

    const unsubscribe = onValue(
      customersRef,
      (snapshot) => {
        setCustomerList(snapshot.val());
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return { customerList, isLoading };
}

export default useCustomerList;
