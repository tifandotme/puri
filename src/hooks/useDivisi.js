import { useState } from "react";
import { ref, get, child } from "firebase/database";
import { auth, database } from "../config/firebase";

/**
 * This hook is used to get the user's divisi from the database
 *
 * @returns {string} The user's divisi
 */
function useDivisi() {
  const [divisi, setDivisi] = useState("");
  const dbRef = ref(database);

  get(child(dbRef, `users/${auth.currentUser?.uid}/divisi`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setDivisi(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return divisi;
}

export default useDivisi;
