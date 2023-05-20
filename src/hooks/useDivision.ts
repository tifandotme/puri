import { User as UserAuth } from "firebase/auth";
import { child, get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../config/firebase";
import { capitalizeWords } from "../utils/misc";

/**
 * Get the division of current logged-in user
 */
function useDivision(user: UserAuth) {
  const [division, setDivision] = useState("");

  const path = `users/${user.uid}/division`;

  useEffect(() => {
    get(child(ref(database), path))
      .then((snapshot) => {
        setDivision(snapshot.val());
      })
      .catch((error) => console.error(error.message));
  }, []);

  return capitalizeWords(division);
}

export default useDivision;
