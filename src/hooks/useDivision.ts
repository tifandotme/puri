import { useState } from "react";
import { ref, get, child } from "firebase/database";
import { auth, database } from "../config/firebase";

/**
 * Get the division of the current user
 */
function useDivision(): string {
  const [division, setDivision] = useState("");

  const path = `users/${auth.currentUser?.uid}/division`;

  get(child(ref(database), path)).then((snapshot) =>
    setDivision(snapshot.val())
  );

  return division;
}

export default useDivision;
