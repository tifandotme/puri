import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { handleSignUp } from "../firebaseAuthOperations";
import { PasswordField } from "./PasswordField";

function SignUp() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) =>
        handleSignUp(data, setLoading, navigate, toast)
      )}
    >
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
              focusBorderColor={errors.email && "red.500"}
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
              focusBorderColor={errors.password && "red.500"}
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="role">Divisi</FormLabel>
            <Select id="role" {...register("divisi", { required: true })}>
              <option value="">--</option>
              <option value="sales">Sales</option>
              <option value="logistik">Logistik</option>
            </Select>
            <FormHelperText>
              Pilihan divisi akan mempengaruhi fitur yang tersedia untuk akun
              yang didaftarkan.
            </FormHelperText>
          </FormControl>
        </Stack>
        <Stack spacing="6">
          <Button
            type="submit"
            colorScheme="red"
            variant="solid"
            isLoading={isLoading}
            isDisabled={errors.password || errors.email ? true : false}
          >
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
  );
}

export default SignUp;
