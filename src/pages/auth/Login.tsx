import {
  Button,
  Divider,
  HStack,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { handleSignIn } from "./handleAuth";
import { EmailField, PasswordField } from "./AuthFields";

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
    <form
      onSubmit={handleSubmit((data) =>
        handleSignIn(data, setLoading, navigate, toast)
      )}
    >
      <Stack spacing="6">
        <Stack spacing="5">
          <EmailField register={register} errors={errors} />
          <PasswordField register={register} errors={errors} />
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
  );
}

export default Login;
