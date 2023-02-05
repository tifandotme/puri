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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PasswordField } from "./PasswordField";
import AuthContainer from "./AuthContainer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <AuthContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button type="submit" colorScheme="red" variant="solid">
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
