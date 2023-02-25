import { Box, useRadio, useRadioGroup, HStack } from "@chakra-ui/react";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  // TODO: learn more about position: relative and position: absolute in a separate project
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
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

function CustomerTypeRadio() {
  const options = ["Individual", "Perusahaan"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "customer-type",
    defaultValue: "Individual",
    onChange: () => {},
  });

  const group = getRootProps();

  return (
    <Box borderBottom="1px solid" borderColor="gray.200" pb={3}>
      <HStack {...group} justify="center">
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
    </Box>
  );
}

export default CustomerTypeRadio;
