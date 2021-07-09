import { useContext } from "react";

import { MainMenuContext } from "../contexts/MainMenuContext";

export function useMainMenu() {
  const value = useContext(MainMenuContext);

  return value;
}
