import { child, get, ref } from "firebase/database";
import { useState } from "react";
import { auth, database } from "../config/firebase";
import { capitalizeWords } from "../utils/misc";

/**
 * Get the division of current logged-in user
 */
function useDivision() {
  const [division, setDivision] = useState("");

  const path = `users/${auth.currentUser?.uid}/division`;

  get(child(ref(database), path))
    .then((snapshot) => setDivision(snapshot.val()))
    .catch((error) => console.error(error.message));

  return capitalizeWords(division);
}

export default useDivision;
