import { useToast } from "@chakra-ui/react";
import {
  child,
  push,
  ref,
  serverTimestamp,
  set,
  update,
} from "firebase/database";
import { NavigateFunction } from "react-router-dom";
import { auth, database } from "../../config/firebase";
import { capitalizeWords } from "../../utils/misc";

async function handleAddCustomer(
  data: AddCustomerForm,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>
) {
  try {
    const { name, id, phone, phone2, address, type, prefixName } = data;

    const customer: Customer<ReturnType<typeof serverTimestamp>> = {
      name: capitalizeWords(name) + (prefixName ? ", " + prefixName : ""),
      id,
      phone,
      ...(phone2 && { phone2 }),
      address,
      type,
      createdAt: serverTimestamp(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      sales: auth.currentUser!.uid,
    };

    // temporary, for testing
    // const customer: Customer<object> = {
    //   name: capitalizeWords(name) + (prefixName ? ", " + prefixName : ""),
    //   id: Math.floor(Math.random() * 999999999999),
    //   phone: Number("8" + Math.floor(Math.random() * 9999999999)),
    //   phone2: Number("8" + Math.floor(Math.random() * 9999999999)),
    //   address,
    //   type,
    //   createdAt: serverTimestamp(),
    //
    //   sales: auth.currentUser!.uid,
    // };

    await set(push(ref(database, "customers")), customer);

    toast({
      title: "Pelanggan berhasil ditambahkan",
      status: "success",
    });

    navigate("/customers");
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast({
        title: error.message,
        status: "error",
      });
    }
  }
}

async function handleEditCustomer(
  data: EditCustomerForm,
  id: string | undefined,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>
) {
  try {
    await update(child(ref(database, "customers"), `${id}`), data);

    toast({
      title: "Pelanggan berhasil diubah",
      status: "success",
    });

    navigate("/customers");
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast({
        title: error.message,
        status: "error",
      });
    }
  }
}

export { handleAddCustomer, handleEditCustomer };
