import { useContext } from "react";

import { DrinkContext } from "../contexts/DrinkContext";

export function useDrink() {
  const value = useContext(DrinkContext);

  return value;
}
