import { User as UserAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";

/**
 * Get the current logged-in user from Firebase Auth (Not Firebase Database!).
 *
 * This will only run once when App is mounted.
 *
 * @returns user and isLoading flag which then can be used to
 * trigger a page loading screen.
 */
function useUserAuth() {
  const [user, setUser] = useState<UserAuth | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user ? user : undefined);
        setLoading(false);
      },
      (e) => console.error(e)
    );

    return unsubscribe;
  }, []);

  return { user, isLoading };
}

export default useUserAuth;
