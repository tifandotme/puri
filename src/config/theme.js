import { extendTheme } from "@chakra-ui/react";

import background from "../assets/background.webp";

/**
 * Custom theme for Chakra UI to modify or extend the default theme
 *
 * @param {string} path - take the current path from the useLocation hook
 * @param {boolean} fullscreenLoading - take the fullscreenLoading state
 * @returns {object} - return the custom theme
 */
function customTheme(path, fullscreenLoading) {
  const isOnAuthPage = ["/login", "/signup", "/forgotpassword"].includes(path);

  return extendTheme({
    // Add the background image only on the auth pages & when the app is not loading
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
      brand: {
        // For used  in colorScheme style prop
        50: "#FDE8E8",
        100: "#F9BEBE",
        200: "#F59494",
        300: "#F16A6A",
        400: "#ED4040",
        500: "#E81717",
        600: "#BA1212",
        700: "#8B0E0E",
        800: "#5D0909",
        900: "#2E0505",
      },
    },
  });
}

export { customTheme };
