import { useToast } from "@chakra-ui/react";
import {
  child,
  push,
  ref,
  serverTimestamp,
  set,
  update,
} from "firebase/database";
import { httpsCallable } from "firebase/functions";
import { NavigateFunction } from "react-router-dom";
import { auth, database, functions } from "../../config/firebase";

async function handleAddOrder(
  data: AddOrderForm,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>
) {
  try {
    const {
      customer,
      qty,
      product,
      additionalInfo,
      payment,
      scheduledTime,
      location,
    } = data;

    const { base, bonus } = qty;

    const order: Order<object> = {
      customer: customer.value, // in uid
      qty: {
        base,
        ...(bonus && { bonus }),
      },
      product,
      additionalInfo,
      ...(payment && { payment }),
      ...(scheduledTime && { scheduledTime }),
      ...(location && { location }),
      createdAt: serverTimestamp(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      sales: auth.currentUser!.uid,
      isDelivered: false,
    };

    await set(push(ref(database, "orders")), order);

    toast({
      title: "Pesanaan berhasil ditambahkan",
      status: "success",
    });

    navigate("/orders");
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast({
        title: error.message,
        status: "error",
      });
    }
  }
}

async function handleEditOrder(
  data: EditOrderForm,
  id: string | undefined,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>
) {
  try {
    await update(child(ref(database, "orders"), `${id}`), data);

    toast({
      title: "Pesanan berhasil diubah",
      status: "success",
    });

    navigate("/orders");
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast({
        title: error.message,
        status: "error",
      });
    }
  }
}

async function handleToggleDelivery(
  id: [string, Order],
  toast: ReturnType<typeof useToast>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const isDelivered = !id[1].isDelivered;
    
    // sends notification to "sales" topic
    if (isDelivered) {
      setLoading(true);
      
      const notification = httpsCallable(functions, "sendOrderStatus");
      await notification({ customer: id[1].customer });
    }

    await update(child(ref(database, "orders"), id[0]), {
      isDelivered,
    });

    toast({
      title: "Status pesanan berhasil diubah",
      status: "success",
    });

    setLoading(false);
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast({
        title: error.message,
        status: "error",
      });
    }
  }
}

export { handleAddOrder, handleEditOrder, handleToggleDelivery };
