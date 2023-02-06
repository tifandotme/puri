import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  Select,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { PasswordField } from "./components/PasswordField";
import AuthContainer from "./components/AuthContainer";
import { auth } from "../config/firebase";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
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
            <HStack spacing="1" justify="center">
              <FormControl isRequired>
                <FormLabel htmlFor="fname">Nama Depan</FormLabel>
                <Input
                  id="fname"
                  type="text"
                  {...register("firstName", { required: true, maxLength: 80 })}
                />
                {}
                <FormErrorMessage>Harus ada nama boss</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="lname">Nama Belakang</FormLabel>
                <Input
                  id="lname"
                  type="text"
                  {...register("lastName", { required: false, maxLength: 100 })}
                />
              </FormControl>
            </HStack>

            <FormControl isRequired isInvalid={errors.email ? true : false}>
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

            <FormControl isRequired isInvalid={errors.password ? true : false}>
              <PasswordField
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password minimal 6 karakter",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password maksimal 20 karakter",
                  },
                })}
              />
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="role">Divisi</FormLabel>
              <Select id="role" {...register("peran", { required: true })}>
                <option value="">--</option>
                <option value="sales">Sales</option>
                <option value="logistik>">Logistik</option>
              </Select>
              <FormHelperText>
                Pilihan divisi akan mempengaruhi fitur yang tersedia untuk akun yang
                didaftarkan.
              </FormHelperText>
            </FormControl>
          </Stack>
          <Stack spacing="6">
            <Button type="submit" colorScheme="red" variant="solid">
              Daftar
            </Button>
          </Stack>
          <Divider />
          <HStack spacing="1" justify="center">
            <Text color="muted">Sudah punya akun?</Text>
            <Link to="/login">
              <Button variant="link" colorScheme="blue" tabIndex="-1">
                Login
              </Button>
            </Link>
          </HStack>
        </Stack>
      </form>
    </AuthContainer>
  );
}

export default SignUp;
