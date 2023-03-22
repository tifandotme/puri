import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../config/firebase";

function useCustomerList() {
  const [customerList, setCustomerList] = useState<CustomerList | undefined>(
    undefined
  );

  useEffect(() => {
    const customersRef = ref(database, "customers");

    const unsubscribe = onValue(
      customersRef,
      (snapshot) => {
        setCustomerList(snapshot.val());
      },
      (error) => {
        console.error(error);
      }
    );

    return unsubscribe;
  }, []);

  return customerList;
}

export default useCustomerList;
