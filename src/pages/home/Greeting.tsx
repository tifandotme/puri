import { Heading, Skeleton } from "@chakra-ui/react";
import { useContext } from "react";
import { auth } from "../../config/firebase";
import { UserListContext } from "../ContextProviders";

function Greeting() {
  const { userList } = useContext(UserListContext);

  // non-null asserted, because this component rendered after user is logged in
  const firstName = userList ? userList[auth.currentUser!.uid].firstName : "";

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
      <Skeleton
        display="inline-block"
        isLoaded={userList !== undefined}
        fitContent
      >
        {firstName ? firstName + "!" : "XXXXXX"}
      </Skeleton>
    </Heading>
  );
}

export default Greeting;
