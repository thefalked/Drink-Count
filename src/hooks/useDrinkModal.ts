import { useContext } from "react";

import { DrinkModalContext } from "../contexts/DrinkModalContext";

export function useDrinkModal() {
  const value = useContext(DrinkModalContext);

  return value;
}
