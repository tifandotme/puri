import { Heading, Skeleton } from "@chakra-ui/react";
import { User as UserAuth } from "firebase/auth";
import { child, get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../config/firebase";

export function Greeting({ userAuth }: { userAuth?: UserAuth; }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    if (!userAuth)
      return;

    get(child(ref(database, "users"), `${userAuth.uid}`)).then((snapshot) => {
      setUser(snapshot.val() as User);
    });
  }, [userAuth]);

  const hour = new Date().getHours();
  let greeting: string;
  if (hour >= 5 && hour < 12) {
    greeting = "Selamat Pagi";
  } else if (hour >= 12 && hour < 15) {
    greeting = "Selamat Siang";
  } else if (hour >= 15 && hour < 18) {
    greeting = "Selamat Sore";
  } else {
    greeting = "Selamat Malam";
  }

  return (
    <Heading
      fontWeight="700"
      fontSize={{ base: "xl", md: "2xl" }}
      letterSpacing="wide"
      lineHeight="1.2"
      ml="5"
      my="2"
    >
      {greeting + ", "}
      <Skeleton display="inline-block" isLoaded={user !== undefined} fitContent>
        {user ? user.firstName + "!" : "XXXXXX"}
      </Skeleton>
    </Heading>
  );
}
