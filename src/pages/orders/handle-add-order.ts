import { useToast } from "@chakra-ui/react";
import { push, ref, serverTimestamp, set } from "firebase/database";
import { FieldValues } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { auth, database } from "../../config/firebase";

async function handleAddOrder(
  data: FieldValues,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>
) {
  try {
    const {
      customer,
      qty,
      product,
      additionalInfo,
      cod,
      scheduledTime,
      location,
    } = data;

    const order: Order = {
      customer: customer.value, // in uid
      qty: {
        base: qty.base,
        ...(qty.bonus && { bonus: qty.bonus }),
      },
      product,
      additionalInfo,

      ...(cod.type && { cod }),
      ...(scheduledTime && {
        scheduledTime: Date.parse(scheduledTime as string),
      }),
      ...(location && { location }),

      createdAt: serverTimestamp(),
      sales: auth.currentUser!.uid,
    };

    await set(push(ref(database, "orders")), order);

    // navigate("/customers");
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
      });
    }
  }
}

export default handleAddOrder;
