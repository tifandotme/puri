import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Select,
  Stack,
  useStyleConfig,
} from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { AppContext } from "../../App";
import ContentWrapper from "../dashboard/ContentWrapper";

function AddOrder() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <ContentWrapper title="Tambah Pesanan">
      <form onSubmit={onSubmit}>
        <Stack
          spacing="6"
          maxW="3xl"
          minH="100vh"
          mx="auto"
          my={{ base: 0, lg: 5 }}
          borderRadius={{ base: 0, lg: 10 }}
          p={10}
          bg="white"
          borderWidth={{ base: 0, lg: 1 }}
          borderColor="gray.200"
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 0, lg: 7 }}
            alignItems={{ base: "center", lg: "stretch" }}
          >
            <Stack w="full" maxW="sm">
              <FormControl isRequired>
                <FormLabel>Nama Pelanggan</FormLabel>
                <CustomerNameSelect />
              </FormControl>
              <Select placeholder="Select..." />
            </Stack>
            <Stack w="full" maxW="sm"></Stack>
          </Stack>
        </Stack>
      </form>
    </ContentWrapper>
  );
}

function CustomerNameSelect() {
  const { customerList, isLoading } = useContext(AppContext);

  // convert customerList to react-select's options
  const customerNameOptions = useMemo(
    () =>
      Object.entries(customerList ?? {}).map(([key, value]) => ({
        value: key,
        label: value.name,
      })),
    [customerList]
  );

  // get style config from chakra-ui's Select component
  const { field, icon } = useStyleConfig("Select", {}) as Record<
    "field" | "icon",
    { [key: string]: any }
  >;

  // assign class names to react-select's inner components,
  // which then will be styled by chakra-ui
  const customStyles = {
    control: ({ isDisabled }: { isDisabled: boolean }) => {
      let str = "select-field";
      if (isDisabled) str += " select-field--is-disabled";
      return str;
    },
    dropdownIndicator: () => "select-icon",
    placeholder: () => "select-placeholder",
  };

  // provide css styles to react-select's inner components using chakra-ui's theme tokens
  const selectChakra = {
    ".select-field": {
      width: field.width,
      minWidth: field.minWidth,
      lineHeight: field.lineHeight,
      bg: field.bg,
      fontSize: field.fontSize,
      px: 1,
      h: field.h,
      borderRadius: field.borderRadius,
      border: field.border,
      borderColor: field.borderColor,
      _hover: field._hover,
      _invalid: field._invalid,
    },
    ".select-field--is-disabled": {
      ...field._disabled,
    },
    ".select-icon": {
      color: icon.color,
      width: 33,
      height: 34,
    },
    ".select-placeholder": {
      color: icon.color,
    },
  };

  return (
    <Box sx={selectChakra}>
      <ReactSelect
        options={customerNameOptions}
        classNames={customStyles}
        components={{
          IndicatorSeparator: () => null, // remove the separator
        }}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default AddOrder;
