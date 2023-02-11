import {
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

/**
 * @param {Function} props.register
 * @param {Object} props.errors
 * @param {Boolean} props.showAsterisk - whether the field has an asterisk or not
 */
const EmailField = ({ register, errors, showAsterisk = false }) => (
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
        pattern: /\S+@\S+\.\S+/,
      })}
    />
    {errors.email && <FormErrorMessage>Email tidak valid</FormErrorMessage>}
  </FormControl>
);

/**
 * @param {Function} props.register
 * @param {Object} props.errors
 * @param {Boolean} props.showAsterisk - whether the field has an asterisk or not
 * @param {Boolean} props.isConstrained - whether the characters is constrained or not
 */
const PasswordField = forwardRef((props, ref) => {
  const {
    register,
    errors,
    showAsterisk = false,
    isConstrained = false,
  } = props;
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);
  const mergeRef = useMergeRefs(inputRef, ref);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };
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
            onClick={onClickReveal}
            tabIndex="-1"
          />
        </InputRightElement>
        <Input
          id="password"
          ref={mergeRef}
          name="password"
          type={isOpen ? "text" : "password"}
          autoComplete="current-password"
          isRequired
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
        <FormErrorMessage>{errors.password.message}</FormErrorMessage>
      )}
    </FormControl>
  );
});

PasswordField.displayName = "PasswordField";

export { PasswordField, EmailField };
