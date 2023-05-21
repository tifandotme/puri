import {
  Button,
  Divider,
  HStack,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { EmailField, PasswordField } from "./AuthFields";
import { handleSignIn } from "./handle-auths";

function LoginPage() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((data) => handleSignIn(data, toast));

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing="6">
        <Stack spacing="5">
          <EmailField register={register} errors={errors} />
          <PasswordField register={register} errors={errors} />
        </Stack>

        <HStack justify="flex-end">
          <Link to="/forgotpassword" tabIndex={-1}>
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
            isLoading={isSubmitting}
            isDisabled={errors.password || errors.email ? true : false}
          >
            Masuk
          </Button>
          <Divider />
          <HStack spacing="1" justify="center">
            <Text color="muted">Belum punya akun?</Text>
            <Link to="/signup" tabIndex={-1}>
              <Button variant="link" colorScheme="blue">
                Buat baru
              </Button>
            </Link>
          </HStack>
        </Stack>
      </Stack>
    </form>
  );
}

export default LoginPage;
