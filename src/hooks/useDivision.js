import { useState } from "react";
import { ref, get, child } from "firebase/database";
import { auth, database } from "../config/firebase";

/**
 * This hook is used to get the user's division from the database
 *
 * @returns {string} The user's division
 */
function useDivision() {
  const [division, setDivision] = useState(undefined);
  const dbRef = ref(database);

  get(child(dbRef, `users/${auth.currentUser?.uid}/division`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setDivision(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return division;
}

export default useDivision;
