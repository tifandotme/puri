import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  Divider,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { handleForgotPassword } from "../firebaseAuthOperations";
import { useState } from "react";

function ForgotPassword() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => handleForgotPassword(data, setLoading, toast))}>
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
          <Stack spacing="6">
            <Button
              type="submit"
              colorScheme="red"
              variant="solid"
              isLoading={isLoading}
              isDisabled={errors.email ? true : false}
            >
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
    </form>
  );
}

export default ForgotPassword;
