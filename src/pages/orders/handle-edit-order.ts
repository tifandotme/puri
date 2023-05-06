import { useToast } from "@chakra-ui/react";
import { child, ref, update } from "firebase/database";
import { NavigateFunction } from "react-router-dom";
import { database } from "../../config/firebase";

async function handleEditOrder(
  data: EditOrderForm,
  id: string | undefined,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>
) {
  try {
    console.log(data);

    await update(child(ref(database, "orders"), `${id}`), data);

    navigate("/orders");
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

export default handleEditOrder;
