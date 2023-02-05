import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  Divider, 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthContainer from "./AuthContainer";

function ForgotPassword() {
  return (
    <AuthContainer>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <Stack spacing="6">
            <Button colorScheme="red" variant="solid">
              Reset Password
            </Button>
            <Divider />
            <HStack spacing="1" justify="center">
              <Link to="/login">
                <Button variant="link" colorScheme="blue">
                  Kembali ke login
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </AuthContainer>
  );
}

export default ForgotPassword;
