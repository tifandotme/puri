import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";

/**
 * Get the current logged-in user. This will only run once when the app is
 * mounted.
 *
 * @returns user and isLoading flag which then can be used to
 * trigger a page loading screen.
 */
function useUser() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : undefined);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, isLoading };
}

export default useUser;
