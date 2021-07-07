import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { BottomNavigator } from "../components/BottomNavigator";
import { DeleteAlertDialog } from "../components/DeleteAlertDialog";

import { DrinkContextProvider } from "../contexts/DrinkContext";

import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />

      <DrinkContextProvider>
        <Component {...pageProps} />
        <DeleteAlertDialog />

        <BottomNavigator />
      </DrinkContextProvider>
    </ChakraProvider>
  );
}
export default MyApp;
