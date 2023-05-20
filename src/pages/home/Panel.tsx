import {
  Box,
  BoxProps,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import React from "react";
import { FaEllipsisH } from "react-icons/fa";

type PanelProps = {
  children: React.ReactNode;
} & BoxProps;

function Panel({ children, ...props }: PanelProps) {
  return (
    <Box
      h="auto"
      p="5"
      borderRadius="10"
      borderWidth="1px"
      borderColor="gray.200"
      bg="white"
      _hover={{
        boxShadow: "md",
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

type EllipsisProps<T extends Record<string, string>> = {
  options: T;
  defaultValue: keyof T extends string ? keyof T : never;
  setState: React.Dispatch<React.SetStateAction<keyof T>>;
};

function Ellipsis<T extends Record<string, string>>({
  options,
  defaultValue,
  setState,
}: EllipsisProps<T>) {
  return (
    <Menu placement="bottom-end" autoSelect={false}>
      <MenuButton
        as={IconButton}
        icon={<FaEllipsisH size={17} />}
        variant="ghost"
        size="sm"
        color="gray.500"
      />
      <MenuList py="0" minW="max-content" fontSize="sm">
        <MenuOptionGroup
          type="radio"
          onChange={(value) => {
            setState(value as keyof T);
          }}
          defaultValue={defaultValue}
        >
          {Object.entries(options).map(([value, displayedValue]) => (
            <MenuItemOption
              key={value}
              value={value}
              _checked={{
                fontWeight: "600",
              }}
              icon={null}
            >
              {displayedValue}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export { Panel, Ellipsis };
