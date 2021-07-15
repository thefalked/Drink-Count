import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Locale = {
  locale: "en-US" | "pt-BR";
  currency: "USD" | "BRL";
};

type LocaleContextType = {
  moneyFormat: Locale;
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
  const [moneyFormat, setMoneyFormat] = useState<Locale>({
    locale: "en-US",
    currency: "USD",
  });
  const [isLiter, setIsLiter] = useState(false);

  function formatMoney(value: number): string {
    const valueFormatted = new Intl.NumberFormat(moneyFormat.locale, {
      style: "currency",
      currency: moneyFormat.currency,
    }).format(value);

    return valueFormatted;
  }

  useEffect(() => {
    const locale =
      Intl.NumberFormat().resolvedOptions().locale === "pt-BR"
        ? "pt-BR"
        : "en-US";
    const currency = locale === "pt-BR" ? "BRL" : "USD";

    setMoneyFormat({
      locale,
      currency,
    });
  }, []);

  return (
    <LocaleContext.Provider
      value={{ moneyFormat, formatMoney, isLiter, setIsLiter }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
