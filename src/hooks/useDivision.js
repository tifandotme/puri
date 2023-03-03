import { useState } from "react";
import { ref, onValue } from "firebase/database";
import { auth, database } from "../config/firebase";

/**
 * This hook is used to get the user's division from the database
 *
 * @returns {string} The user's division
 */
function useDivision() {
  const [division, setDivision] = useState(undefined);

  onValue(
    ref(database, `users/${auth.currentUser?.uid}/division`),
    (snapshot) => {
      setDivision(snapshot.val());
    },
    { onlyOnce: true }
  );

  return division;
}

export default useDivision;
