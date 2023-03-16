import { set, ref, push, serverTimestamp } from "firebase/database";
import { FieldValues } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import { database } from "../../config/firebase";

async function handleAddCustomer(
  data: FieldValues,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>
) {
  try {
    const { name, id, phone, phone2, address, type, prefixName } = data;

    const customer = {
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

function capitalizeWords(str: string): string {
  // usage: 🫡 (CAP-italize) words, function name is not enough, so additional comment is needed, hehe
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  return words.join(" ");
}

export default handleAddCustomer;
