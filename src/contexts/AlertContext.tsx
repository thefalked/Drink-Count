import { useToast } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { createContext, ReactNode, useState } from "react";

import { useDrink } from "../hooks/useDrink";

type Drink = {
  id: number;
  name: string;
};

type AlertContextType = {
  isAlertOpen: boolean;
  drink: Drink | undefined;
  openAlert: (drink: Drink) => void;
  confirmRemoveDrink: () => void;
  handleAlertClose: () => void;
};

type AlertContextProviderProps = {
  children: ReactNode;
};

export const AlertContext = createContext({} as AlertContextType);

export function AlertContextProvider({ children }: AlertContextProviderProps) {
  const [isAlertOpen, setAlertIsOpen] = useState(false);
  const [drink, setDrink] = useState<Drink>();

  const { removeDrink } = useDrink();
  const toast = useToast();
  const { t } = useTranslation("delete_alert_dialog");

  function openAlert(drink: Drink) {
    setDrink(drink);
    setAlertIsOpen(true);
  }

  function confirmRemoveDrink() {
    if (drink) {
      const drinkRemoved = removeDrink(drink.id);

      if (drinkRemoved) {
        setAlertIsOpen(false);
        toast({
          title: t("toast-succes-title"),
          description: `${t("toast-succes-description-1")} ${drink.name} ${t(
            "toast-succes-description-2"
          )}`,
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: t("toast-error-title"),
          description: t("toast-error-description"),
          status: "error",
          isClosable: true,
        });
      }
    }
  }

  function handleAlertClose() {
    setAlertIsOpen(false);
  }

  return (
    <AlertContext.Provider
      value={{
        isAlertOpen,
        drink,
        openAlert,
        handleAlertClose,
        confirmRemoveDrink,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}
