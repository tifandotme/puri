import { useToast } from "@chakra-ui/react";
import { push, ref, serverTimestamp, set } from "firebase/database";
import { FieldValues } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { auth, database } from "../../config/firebase";
import { capitalizeWords } from "../../utils/utils";

async function handleAddCustomer(
  data: FieldValues,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>
) {
  try {
    const { name, id, phone, phone2, address, type, prefixName } = data;

    // const customer: Customer<ReturnType<typeof serverTimestamp>> = {
    //   name: capitalizeWords(name) + (prefixName ? ", " + prefixName : ""),
    //   id,
    //   phone,
    //   ...(phone2 && { phone2 }),
    //   address,
    //   type,
    //   createdAt: serverTimestamp(),
    //   sales: auth.currentUser?.uid,
    // };

    // temporary, for testing
    const customer: Customer<ReturnType<typeof serverTimestamp>> = {
      name: capitalizeWords(name) + (prefixName ? ", " + prefixName : ""),
      id: Math.floor(Math.random() * 999999999999),
      phone: Number("8" + Math.floor(Math.random() * 9999999999)),
      phone2: Number("8" + Math.floor(Math.random() * 9999999999)),
      address,
      type,
      createdAt: serverTimestamp(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      sales: auth.currentUser!.uid,
    };

    await set(push(ref(database, "customers")), customer);

    // navigate("/customers");
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
      });
    }
  }
}

export default handleAddCustomer;
