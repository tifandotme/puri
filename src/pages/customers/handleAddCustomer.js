import { set, ref, push, serverTimestamp } from "firebase/database";
import { database } from "../../config/firebase";

async function handleAddCustomer(data, setLoading, navigate) {
  try {
    setLoading(true);

    await set(push(ref(database, "customers")), {
      ...data,
      CreatedAt: serverTimestamp(),
    });

    navigate("/customers");
  } catch (error) {
    // toast({
    //   title: "Email sudah terdaftar",
    //   status: "error",
    //   duration: 3000,
    // });ss
    console.log(error);
  } finally {
    setLoading(false);
  }
}

export default handleAddCustomer;
