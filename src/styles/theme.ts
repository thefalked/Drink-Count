import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// Configuring theme and setting has system color
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// Updating the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "1024px",
  xl: "1440px",
});

// extending theme and adding font Roboto
export const theme = extendTheme({
  config,
  breakpoints,
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
});
