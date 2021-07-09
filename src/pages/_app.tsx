import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { DrinkContextProvider } from "../contexts/DrinkContext";
import { AlertContextProvider } from "../contexts/AlertContext";
import { MainMenuContextProvider } from "../contexts/MainMenuContext";

import { Header } from "../components/Header";
import { BottomNavigator } from "../components/BottomNavigator";
import { DeleteAlertDialog } from "../components/DeleteAlertDialog";
import { MainMenu } from "../components/MainMenu";

import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />

      <DrinkContextProvider>
        <AlertContextProvider>
          <Component {...pageProps} />
          <DeleteAlertDialog />
        </AlertContextProvider>

        <MainMenuContextProvider>
          <BottomNavigator />
          <MainMenu />
        </MainMenuContextProvider>
      </DrinkContextProvider>
    </ChakraProvider>
  );
}
export default MyApp;
