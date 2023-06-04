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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
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

  const [isShowAgain, setIsShowAgain] = useState(
    localStorage.getItem("showAgain") !== "false"
  );

  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (isShowAgain) {
        onOpen();
      }
    }, 1500); // set the delay time in milliseconds
    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      <HStack justify="center" mb="10" align="flex-start">
        <Heading textAlign="center" size="md" lineHeight="1.6" pl="40px">
          Login
        </Heading>
        <Popover
          isOpen={isOpen}
          onClose={onClose}
          arrowSize={15}
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
                  onClick={onToggle}
                />
              </PopoverTrigger>
              <PopoverContent
                border="1px solid"
                borderColor="gray.300"
                bg="white"
                textAlign="left"
                py="2"
                px="2"
                boxShadow="md"
              >
                <PopoverArrow bg="white" />
                <PopoverCloseButton />
                <PopoverHeader fontWeight="600">
                  Ini adalah aplikasi demo
                </PopoverHeader>
                <PopoverBody display="flex" flexDir="column">
                  <Text>
                    Apakah Anda ingin login sebagai salah satu divisi
                    berikut?
                  </Text>
                  <Stack
                    spacing={2}
                    mt={3}
                    mb={1}
                    direction="row"
                    justify="center"
                  >
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
                  {isShowAgain && (
                    <Button
                      mt={2}
                      variant="link"
                      size="sm"
                      colorScheme="secondary"
                      justifySelf="center"
                      onClick={() => {
                        localStorage.setItem("showAgain", "false");
                        setIsShowAgain(false);
                        onClose();
                      }}
                    >
                      Tidak, jangan tampilkan lagi
                    </Button>
                  )}
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
