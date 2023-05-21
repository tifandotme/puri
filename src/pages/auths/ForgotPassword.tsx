import { Button, Divider, HStack, Stack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { EmailField } from "./AuthFields";
import { handleForgotPassword } from "./handle-auths";

function ForgotPasswordPage() {
  const toast = useToast({
    duration: 3000,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((data) => handleForgotPassword(data, toast));

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing="6">
        <Stack spacing="5">
          <EmailField register={register} errors={errors} />

          <Stack spacing="6">
            <Button
              type="submit"
              colorScheme="red"
              variant="solid"
              isLoading={isSubmitting}
              isDisabled={errors.email ? true : false}
            >
              Reset Password
            </Button>

            <Divider />

            <HStack spacing="1" justify="center">
              <Link to="/login" tabIndex={-1}>
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

export default ForgotPasswordPage;
