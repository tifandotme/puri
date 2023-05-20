import { Box, SelectFieldProps, useStyleConfig } from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import ReactSelect, { ClassNamesConfig, Options } from "react-select";
import { CustomerListContext } from "../ContextProviders";


type CustomerNameSelectProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  register: Path<TFieldValues>;
};

/**
 * A custom select component for selecting customer name.
 * This component uses react-select styled with chakra-ui's style config
 * 
 * @param control react-hook-form's control object
 * @param register react-hook-form's input name to register
 */
function CustomerNameSelect<T extends FieldValues>({
  control,
  register,
}: CustomerNameSelectProps<T>) {
  const { customerList, isLoading } = useContext(CustomerListContext);

  // convert customerList to react-select's options format
  // note: we can actually use our own format using getOptionLabel and getOptionValue
  const options: Options<{ value: string; label: string }> = useMemo(
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
    SelectFieldProps
  >;

  // assign class names to react-select's inner components
  const customStyles: ClassNamesConfig = {
    control: ({ isDisabled }) => {
      let str = "select-field";
      if (isDisabled) str += " select-field--is-disabled";
      return str;
    },
    dropdownIndicator: () => "select-icon",
    placeholder: () => "select-placeholder",
  };

  // provide css styles to react-select's inner components using chakra-ui's theme tokens
  const selectChakra: Record<string, SelectFieldProps> = {
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
      opacity: field._disabled?.opacity as number,
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
      <Controller
        name={register} // the output format will be { value, label }
        control={control}
        render={({ field }) => (
          <ReactSelect
            required
            options={options}
            classNames={customStyles}
            components={{
              IndicatorSeparator: () => null, // removes the separator
            }}
            isLoading={isLoading}
            {...field}
          />
        )}
      />
    </Box>
  );
}

export default CustomerNameSelect;
