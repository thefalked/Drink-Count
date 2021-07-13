import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";

import { DrinkContextProvider } from "../contexts/DrinkContext";
import { LocaleContextProvider } from "../contexts/LocaleContext";
import { AlertContextProvider } from "../contexts/AlertContext";
import { DrinkModalContextProvider } from "../contexts/DrinkModalContext";

import nextI18NextConfig from "../../next-i18next.config.js";

import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DrinkContextProvider>
        <LocaleContextProvider>
          <AlertContextProvider>
            <DrinkModalContextProvider>
              <Component {...pageProps} />
            </DrinkModalContextProvider>
          </AlertContextProvider>
        </LocaleContextProvider>
      </DrinkContextProvider>
    </ChakraProvider>
  );
}
export default appWithTranslation(MyApp, nextI18NextConfig);
