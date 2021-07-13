import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { DrinkContextProvider } from "../contexts/DrinkContext";
import { LocaleContextProvider } from "../contexts/LocaleContext";
import { AlertContextProvider } from "../contexts/AlertContext";
import { MainMenuContextProvider } from "../contexts/MainMenuContext";
import { DrinkModalContextProvider } from "../contexts/DrinkModalContext";

import { Header } from "../components/Header";
import { BottomNavigator } from "../components/BottomNavigator";
import { DeleteAlertDialog } from "../components/DeleteAlertDialog";
import { MainMenu } from "../components/MainMenu";
import { DrinkModal } from "../components/DrinkModal";

import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />

      <DrinkContextProvider>
        <LocaleContextProvider>
          <AlertContextProvider>
            <DrinkModalContextProvider>
              <Component {...pageProps} />
              <DrinkModal />
            </DrinkModalContextProvider>
            <DeleteAlertDialog />
          </AlertContextProvider>

          <MainMenuContextProvider>
            <BottomNavigator />
            <MainMenu />
          </MainMenuContextProvider>
        </LocaleContextProvider>
      </DrinkContextProvider>
    </ChakraProvider>
  );
}
export default MyApp;
