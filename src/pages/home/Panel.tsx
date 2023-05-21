import {
  Box,
  BoxProps,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useToken,
} from "@chakra-ui/react";
import React from "react";
import { renderToString } from "react-dom/server";
import { IconType } from "react-icons";
import { FaEllipsisH } from "react-icons/fa";

type PanelProps = {
  icon?: IconType;
  children: React.ReactNode;
} & BoxProps;

function Panel({ icon, children, ...props }: PanelProps) {
  const colorNormal = useToken("colors", "gray.100");
  const colorHover = useToken("colors", "secondary.50");

  const [iconColor, setIconColor] = React.useState<string>(colorNormal);

  const iconUrl = (icon: IconType) =>
    `data:image/svg+xml,${encodeURIComponent(
      renderToString(icon({ color: iconColor, size: "220px" }))
    )}`;

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
        color: "secondary.800",
      }}
      bgImage={icon ? iconUrl(icon) : undefined}
      bgPosition="-20px 26px"
      bgRepeat="no-repeat"
      onPointerEnter={() => {
        setIconColor(colorHover);
      }}
      onPointerLeave={() => {
        setIconColor(colorNormal);
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
