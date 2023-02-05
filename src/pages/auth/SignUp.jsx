import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import { PasswordField } from "./PasswordField";

function SignUp() {
  return (
    <AuthContainer>
      <Stack spacing="6">
        <Stack spacing="5">
          <HStack spacing="1" justify="center">
            <FormControl>
              <FormLabel htmlFor="name">Nama Depan</FormLabel>
              <Input id="name" type="name" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">Nama Belakang</FormLabel>
              <Input id="name" type="name" />
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <PasswordField />
        </Stack>
        <Stack spacing="6">
          <Button colorScheme="red" variant="solid">
            Daftar
          </Button>
        </Stack>
        <Divider />
        <HStack spacing="1" justify="center">
          <Text color="muted">Sudah punya akun?</Text>
          <Link to="/login">
            <Button variant="link" colorScheme="blue">
              Login
            </Button>
          </Link>
        </HStack>
      </Stack>
    </AuthContainer>
  );
}

export default SignUp;
