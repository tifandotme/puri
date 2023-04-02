import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { EmailField, PasswordField } from "./AuthFields";
import { handleSignUp } from "./handle-auths";

function SignUp() {
  const toast = useToast();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // used in select field (onKeyDown) and submit button
  const onSubmit = handleSubmit((data) => handleSignUp(data, navigate, toast));

  return (
    <form onSubmit={onSubmit}>
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

          <EmailField register={register} errors={errors} showAsterisk />
          <PasswordField
            register={register}
            errors={errors}
            showAsterisk
            isConstrained
          />

          <FormControl
            isRequired
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          >
            <FormLabel htmlFor="role">Divisi</FormLabel>
            <Select id="role" {...register("division", { required: true })}>
              <option value="">—</option>
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
            isLoading={isSubmitting}
            isDisabled={errors.password || errors.email ? true : false}
          >
            Daftar
          </Button>

          <Divider />

          <HStack spacing="1" justify="center">
            <Text color="muted">Sudah punya akun?</Text>
            <Link to="/login" tabIndex={-1}>
              <Button variant="link" colorScheme="blue">
                Login
              </Button>
            </Link>
          </HStack>
        </Stack>
      </Stack>
    </form>
  );
}

export default SignUp;
