import { useContext } from "react";

import { AlertContext } from "../contexts/AlertContext";

export function useAlert() {
  const value = useContext(AlertContext);

  return value;
}
