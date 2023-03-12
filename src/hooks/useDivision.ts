import { useState } from "react";
import { ref, get, child } from "firebase/database";
import { auth, database } from "../config/firebase";

/**
 * This hook is used to fetch the user's division once from the database
 *
 * @returns {string} The user's division
 */
function useDivision() {
  const [division, setDivision] = useState("");

  const path = `users/${auth.currentUser.uid}/division`;

  get(child(ref(database), path)).then((snapshot) =>
    setDivision(snapshot.val())
  );

  return division;
}

export default useDivision;
