import { Button, HStack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { handleSignOut } from "../auth/handleAuth";

function AuthButton({ user }) {
  const navigate = useNavigate();

  return (
    <>
      <HStack p="2" position="absolute" right="0">
        {user && (
          <Button
            onClick={() => handleSignOut(navigate)}
            variant="solid"
            colorScheme="red"
          >
            <Text fontWeight="bold">{user}</Text>
          </Button>
        )}
        <Link to="/">
          <Button colorScheme="messenger">Home</Button>
        </Link>
        <Link to="/login">
          <Button colorScheme="green">Login</Button>
        </Link>
      </HStack>
    </>
  );
}

export default AuthButton;
