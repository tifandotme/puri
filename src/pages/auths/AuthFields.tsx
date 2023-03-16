import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";

type EFProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  /**
   * if `true`, FormControl will be marked as required
   */
  showAsterisk?: boolean;
};

function EmailField({ register, errors, showAsterisk }: EFProps) {
  return (
    <FormControl
      isInvalid={errors.email ? true : false}
      isRequired={showAsterisk}
    >
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input
        id="email"
        type="text"
        isRequired
        focusBorderColor={errors.email && "red.500"}
        {...register("email", {
          required: true,
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Email tidak valid",
          },
        })}
      />
      {errors.email && (
        <FormErrorMessage>{errors.email.message as string}</FormErrorMessage>
      )}
    </FormControl>
  );
}

type PFProps = EFProps & {
  /**
   * if `true`, password will be constrained to 6-20 characters long
   */
  isConstrained?: boolean;
};

function PasswordField({
  register,
  errors,
  showAsterisk,
  isConstrained,
}: PFProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <FormControl
      isInvalid={errors.password ? true : false}
      isRequired={showAsterisk}
    >
      <FormLabel htmlFor="password">Password</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onToggle}
            tabIndex={-1}
          />
        </InputRightElement>
        <Input
          id="password"
          type={isOpen ? "text" : "password"}
          autoComplete="current-password"
          focusBorderColor={errors.password && "red.500"}
          {...register("password", {
            required: true,
            ...(isConstrained && {
              minLength: {
                value: 6,
                message: "Password minimal 6 karakter",
              },
              maxLength: {
                value: 20,
                message: "Password maksimal 20 karakter",
              },
            }),
          })}
        />
      </InputGroup>
      {errors.password && (
        <FormErrorMessage>{errors.password.message as string}</FormErrorMessage>
      )}
    </FormControl>
  );
}

export { PasswordField, EmailField };
