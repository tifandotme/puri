import {
  Box,
  HStack,
  UseRadioProps,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type CustomerTypeRadioProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  register: Path<TFieldValues>;
  setCustomerType: React.Dispatch<React.SetStateAction<any>>;
};

function CustomerTypeRadio<TFieldValues extends FieldValues>({
  control,
  register,
  setCustomerType,
}: CustomerTypeRadioProps<TFieldValues>) {
  const options: CustomerType[] = ["individu", "perusahaan"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "type",
    defaultValue: options[0],
    onChange: (value) => {
      setCustomerType(value);
    },
  });
  const group = getRootProps();

  return (
    <Box borderBottom="1px solid" borderColor="gray.200" pb={3}>
      <Controller
        name={register}
        control={control}
        render={({ field }) => (
          <HStack {...group} {...field} justify="center" spacing={2}>
            {options.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </RadioCard>
              );
            })}
          </HStack>
        )}
      />
    </Box>
  );
}

function RadioCard(
  props: UseRadioProps & {
    children: React.ReactNode;
  }
) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const radio = getRadioProps();

  // TODO: learn more about position: relative and position: absolute in a separate project
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...radio}
        cursor="pointer"
        borderRadius="md"
        pos="relative"
        color="gray.600"
        fontSize="md"
        transition="background-color 0.1s"
        _checked={{
          color: "black",
          _after: {
            content: '""',
            display: "block",
            pos: "absolute",
            left: "8px",
            right: "8px",
            height: 0,
            bottom: -3,
            borderBottom: "3px solid",
          },
        }}
        _hover={{
          bg: "gray.200",
        }}
        px={4}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default CustomerTypeRadio;
