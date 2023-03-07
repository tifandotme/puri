import { set, ref, push, serverTimestamp } from "firebase/database";
import { database } from "../../config/firebase";

function capitalizeWords(str) {
  // usage: 🫡 (CAP-italize) words, function name is not enough, so additional comment is needed, myess
  let words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  return words.join(" ");
}

async function handleAddCustomer(
  { name, id, phone, phone2, address, type, prefixName },
  setLoading,
  navigate
) {
  try {
    setLoading(true);

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
