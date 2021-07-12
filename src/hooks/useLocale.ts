import { useContext } from "react";

import { LocaleContext } from "../contexts/LocaleContext";

export function useLocale() {
  const value = useContext(LocaleContext);

  return value;
}
