import { User } from "firebase/auth";
import { onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../config/firebase";

function useUserList(user?: User) {
  const [userList, setUserList] = useState<UserList | undefined>(undefined);

  useEffect(() => {
    if (!user) return;

    const userRef = ref(database, "users");
    const userQuery = query(userRef);

    const unsubscribe = onValue(
      userQuery,
      (snapshot) => {
        if (snapshot.exists()) {
          setUserList(snapshot.val() as UserList);
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return unsubscribe;
  }, [user]);

  return { userList };
}

export default useUserList;
