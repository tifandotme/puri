import { set, ref, push, serverTimestamp } from "firebase/database";
import { useToast } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import { database } from "../../config/firebase";
import { capitalizeWords } from "../../utils/capitalize-words";
import { FieldValues } from "react-hook-form";

async function handleAddCustomer(
  data: FieldValues,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>,
) {
  try {
    const { name, id, phone, phone2, address, type, prefixName } = data;

    const customer: Customer = {
      name: (prefixName ? prefixName + ". " : "") + capitalizeWords(name),
      id,
      phone,
      ...(phone2 && { phone2 }),
      address,
      type,
      CreatedAt: serverTimestamp(),
    };

    await set(push(ref(database, "customers")), customer);

    navigate("/customers");
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
