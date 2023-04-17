import { useToast } from "@chakra-ui/react";
import { push, ref, serverTimestamp, set } from "firebase/database";
import { FieldValues } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { auth, database } from "../../config/firebase";
import productList from "./product-list";

async function handleAddOrder(
  data: FieldValues,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>
) {
  try {
    // {
    //   "qty": {
    //     "base": 11,
    //     "bonus": null
    //   },
    //   "brand": "serbaguna",
    //   "additionalInfo": "222",
    //   "customer": {
    //     "value": "-NRITh-CaqcYeVl0povO",
    //     "label": "Kandang Kebo, UD"
    //   },
    //   "cod": {
    //     "type": "cash",
    //     "amount": 333
    //   },
    //   "scheduledTime": "1111-11-11",
    //   "location": "https://google.com"
    // }

    const {
      customer,
      qty,
      product,
      additionalInfo,
      cod,
      scheduledTime,
      location,
    } = data;

    const order: Order<
      typeof productList,
      ReturnType<typeof serverTimestamp>
    > = {
      customer: customer.value,
      qty: {
        base: qty.base,
        ...(qty.bonus && { bonus: qty.bonus }),
      },
      product,
      additionalInfo,
      ...(cod.type && { cod }),
      ...(scheduledTime && {
        scheduledTime: Date.parse(scheduledTime as string), // why doesnt this give an error?
      }),

      ...(location && { location }),
      createdAt: serverTimestamp(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      sales: auth.currentUser!.uid,
    };

    console.log("Data", data);
    console.log("Order", order);

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
