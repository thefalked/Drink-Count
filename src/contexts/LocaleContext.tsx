import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Locale = {
  locale: "en" | "pt-BR";
  currency: "USD" | "BRL";
};

type LocaleContextType = {
  moneyFormat: Locale;
  setMoneyFormat: Dispatch<SetStateAction<Locale>>;
  formatMoney: (value: number) => string;
  isLiter: boolean;
  setIsLiter: Dispatch<SetStateAction<boolean>>;
};

type LocaleContextProviderProps = {
  children: ReactNode;
};

export const LocaleContext = createContext({} as LocaleContextType);

export function LocaleContextProvider({
  children,
}: LocaleContextProviderProps) {
  const [isLiter, setIsLiter] = useState(false);
  const [moneyFormat, setMoneyFormat] = useState<Locale>({
    locale: "en",
    currency: "USD",
  });

  function formatMoney(value: number): string {
    const valueFormatted = new Intl.NumberFormat(moneyFormat.locale, {
      style: "currency",
      currency: moneyFormat.currency,
    }).format(value);

    return valueFormatted;
  }

  return (
    <LocaleContext.Provider
      value={{ moneyFormat, setMoneyFormat, formatMoney, isLiter, setIsLiter }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
