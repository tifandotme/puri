import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Input,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { PasswordField } from "./components/PasswordField";
import AuthContainer from "./components/AuthContainer";
import { handleSignIn } from "./firebaseAuthOperations";

function Login() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <AuthContainer>
      <form
        onSubmit={handleSubmit((data) =>
          handleSignIn(data, setLoading, navigate, toast)
        )}
      >
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isInvalid={errors.email ? true : false}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="text"
                {...register("email", {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}
                focusBorderColor={errors.email && "red.500"}
              />
              {errors.email && (
                <FormErrorMessage>Email tidak valid</FormErrorMessage>
              )}
            </FormControl>

            <FormControl>
              <PasswordField {...register("password", { required: true })} />
            </FormControl>
          </Stack>
          <HStack justify="flex-end">
            <Link to="/forgotpassword" tabIndex="-1">
              <Button variant="link" colorScheme="blue" size="sm">
                Lupa password?
              </Button>
            </Link>
          </HStack>
          <Stack spacing="6">
            <Button
              type="submit"
              colorScheme="red"
              variant="solid"
              isLoading={isLoading}
              isDisabled={errors.password || errors.email ? true : false}
            >
              Masuk
            </Button>
            <Divider />
            <HStack spacing="1" justify="center">
              <Text color="muted">Belum punya akun?</Text>
              <Link to="/signup" tabIndex="-1">
                <Button variant="link" colorScheme="blue">
                  Buat baru
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </form>
    </AuthContainer>
  );
}

export default Login;
