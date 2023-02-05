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

function Login() {
  return (
    <AuthContainer>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <PasswordField />
        </Stack>
        <HStack justify="flex-end">
          <Link to="/forgotpassword">
            <Button variant="link" colorScheme="blue" size="sm">
              Lupa password?
            </Button>
          </Link>
        </HStack>
        <Stack spacing="6">
          <Button colorScheme="red" variant="solid">
            Masuk
          </Button>
          <Divider />
          <HStack spacing="1" justify="center">
            <Text color="muted">Belum punya akun?</Text>
            <Link to="/signup">
              <Button variant="link" colorScheme="blue">
                Buat baru
              </Button>
            </Link>
          </HStack>
        </Stack>
      </Stack>
    </AuthContainer>
  );
}

export default Login;
