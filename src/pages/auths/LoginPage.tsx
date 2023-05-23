import {
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useToast,
  useToken,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { MdInfoOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { EmailField, PasswordField } from "./AuthFields";
import { handleSignIn } from "./handle-auths";

function LoginPage() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((data) => handleSignIn(data, toast));

  const initRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <HStack justify="center" mb="10" align="flex-start">
        <Heading textAlign="center" size="md" lineHeight="1.5" pl="40px">
          Login
        </Heading>
        <Popover
          defaultIsOpen={true}
          arrowSize={15}
          arrowShadowColor={useToken("colors", "gray.400")}
          placement="bottom"
          initialFocusRef={initRef}
        >
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <IconButton
                  position="relative"
                  aria-label="Introduction"
                  icon={<Icon as={MdInfoOutline} boxSize={6} />}
                  variant="ghost"
                  colorScheme="blue"
                  size="sm"
                />
              </PopoverTrigger>
              <PopoverContent
                border="1px solid"
                borderColor="gray.300"
                bg="white"
                textAlign="left"
                py="2"
                px="3"
                boxShadow="md"
              >
                <PopoverArrow bg="white" />
                <PopoverCloseButton />
                <PopoverHeader fontWeight="600">
                  Ini adalah aplikasi demo
                </PopoverHeader>
                <PopoverBody>
                  <Text>Daftar akun atau login instan sebagai divisi:</Text>
                  <Stack spacing={2} mt={3} direction="row" justify="center">
                    <Button
                      ref={initRef}
                      w="24"
                      colorScheme="secondary"
                      onClick={() => {
                        setValue("email", "demo-logistik@puri.systems");
                        setValue("password", "123456");
                        onClose();
                      }}
                    >
                      Logistik
                    </Button>
                    <Button
                      w="24"
                      colorScheme="secondary"
                      onClick={() => {
                        setValue("email", "demo-sales@puri.systems");
                        setValue("password", "123456");
                        onClose();
                      }}
                    >
                      Sales
                    </Button>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </>
          )}
        </Popover>
      </HStack>

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
    </>
  );
}

export default LoginPage;
