import { extendTheme, defineStyleConfig } from "@chakra-ui/react";
import * as background from "../assets/background.webp";

import "@fontsource/inter/variable.css";
import "@fontsource/raleway/variable.css";

const inputMultiPart = defineStyleConfig({
  variants: {
    outline: {
      field: {
        bg: "white",
        borderColor: "gray.500",
        _hover: {
          borderColor: "gray.900",
        },
        _disabled: {
          opacity: 0.5,
        },
      },
    },
  },
});

const inputSinglePart = defineStyleConfig({
  variants: {
    outline: {
      bg: "white",
      borderColor: "gray.500",
      _hover: {
        borderColor: "gray.900",
      },
      _disabled: {
        _placeholder: {
          color: "black",
          opacity: 1,
        },
      },
    },
  },
});

/**
 * Custom theme for Chakra UI to modify or extend the default theme
 *
 * @param {string} path - take the current path from the useLocation hook
 * @param {boolean} fullscreenLoading - take the fullscreenLoading state
 * @returns {object} - return the custom theme
 */
export default function customTheme(path, fullscreenLoading) {
  const isOnAuthPage = ["/login", "/signup", "/forgotpassword"].includes(path);

  return extendTheme({
    fonts: {
      body: "InterVariable, sans-serif",
      heading: "InterVariable, sans-serif",
    },
    components: {
      Textarea: inputSinglePart,
      Input: inputMultiPart,
      Select: inputMultiPart,
    },
    ...(isOnAuthPage &&
      !fullscreenLoading && {
        styles: {
          global: {
            body: {
              bgImage: { base: "null", sm: `url('${background}')` },
              bgRepeat: "no-repeat",
              bgSize: "cover",
              bgPosition: "center",
              bgAttachment: "fixed",
            },
          },
        },
      }),
    colors: {
      // https://coolors.co/palette/e63946-f1faee-a8dadc-457b9d-1d3557
      black: "#0a0d12",
      muted: "#4d5560", // the same as gray.600
      primary: "#E63946",
      secondary: "#457B9D",
      secondaryLighter: "#A8DADC",
      secondaryDarker: "#1D3557",
      gray: {
        50: "#f9fafa",
        100: "#f1f1f2",
        200: "#e6e7e9",
        300: "#d2d4d7",
        400: "#a9adb2",
        500: "#797f88",
        600: "#4d5560",
        700: "#2e3744",
        800: "#19202b",
        900: "#141a23",
      },
      red: {
        // almost the same as primary
        50: "#fef5f6",
        100: "#fad8db",
        200: "#f6b5ba",
        300: "#f0888f",
        400: "#ec6b75",
        500: "#e63b48",
        600: "#c4313c",
        700: "#9e2730",
        800: "#862129",
        900: "#62181e",
      },
      orange: {
        50: "#fefaf5",
        100: "#faebd6",
        200: "#f4d4a7",
        300: "#ebb161",
        400: "#d89436",
        500: "#ba802e",
        600: "#9d6c27",
        700: "#7d561f",
        800: "#624418",
        900: "#513714",
      },
      yellow: {
        50: "#fefefb",
        100: "#fcfae4",
        200: "#f5efaf",
        300: "#ede26e",
        400: "#dccf37",
        500: "#b5aa2d",
        600: "#918824",
        700: "#716a1c",
        800: "#555015",
        900: "#464211",
      },
      green: {
        50: "#f3fef9",
        100: "#bef7df",
        200: "#6becb7",
        300: "#35d794",
        400: "#2fbc81",
        500: "#28a26f",
        600: "#21865c",
        700: "#1a6848",
        800: "#15553b",
        900: "#114630",
      },
      teal: {
        50: "#f0fcfd",
        100: "#bcf2f7",
        200: "#7ae5ee",
        300: "#37d0de",
        400: "#2fb1bc",
        500: "#2896a0",
        600: "#207a82",
        700: "#195f65",
        800: "#154f54",
        900: "#114145",
      },
      cyan: {
        50: "#f4fbfe",
        100: "#cfeef9",
        200: "#b9e7f6",
        300: "#9fdef3",
        400: "#4dc2e9",
        500: "#36b3dc",
        600: "#31a1c6",
        700: "#2985a4",
        800: "#216d86",
        900: "#1a5568",
      },
      blue: {
        50: "#f1f6fd",
        100: "#cddff9",
        200: "#a8c8f4",
        300: "#80aeef",
        400: "#5895ea",
        500: "#387ee0",
        600: "#2f69bc",
        700: "#245190",
        800: "#1d4276",
        900: "#183660",
      },
      purple: {
        50: "#f9f5fe",
        100: "#e7d9fa",
        200: "#d5bdf7",
        300: "#ba93f1",
        400: "#a775ee",
        500: "#8d4ce8",
        600: "#7835d6",
        700: "#622baf",
        800: "#512490",
        900: "#3c1b6b",
      },
      pink: {
        50: "#fef5f9",
        100: "#fad8e6",
        200: "#f6b8d2",
        300: "#f08ab5",
        400: "#ec679e",
        500: "#dd377c",
        600: "#be2f6b",
        700: "#9b2657",
        800: "#791e44",
        900: "#591632",
      },
    },
  });
}
