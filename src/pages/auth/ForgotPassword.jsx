import { Button, Divider, HStack, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { handleForgotPassword } from "./handleAuth";
import { EmailField } from "./AuthFields";

function ForgotPassword() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) =>
        handleForgotPassword(data, setLoading, toast)
      )}
    >
      <Stack spacing="6">
        <Stack spacing="5">
          <EmailField register={register} errors={errors} required={true} />

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
              <Link to="/login" tabIndex="-1">
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
