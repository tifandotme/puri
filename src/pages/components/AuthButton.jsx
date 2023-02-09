import { Button, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { handleSignOut } from "../firebaseAuthOperations";

function AuthButton({ user, navigate }) {
  return (
    <>
      <HStack justifyContent="center" borderBottom="solid 2px gray">
        <Link to="/">
          <Button colorScheme="messenger">Home</Button>
        </Link>
        <Link to="/login">
          <Button colorScheme="green">Login</Button>
        </Link>
        <Link to="/signup">
          <Button colorScheme="red">Sign up</Button>
        </Link>
        <Button
          onClick={() => handleSignOut(navigate)}
          variant="outline"
          colorScheme="blue"
        >
          Sign Out
        </Button>
        <Text fontWeight="bold">User: {user}</Text>
      </HStack>
    </>
  );
}

export default AuthButton;
