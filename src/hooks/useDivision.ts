import { useState } from "react";
import { ref, get, child } from "firebase/database";

import { auth, database } from "../config/firebase";
import { capitalizeWords } from "../utils/utils";

/**
 * Get the division of the current user
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
