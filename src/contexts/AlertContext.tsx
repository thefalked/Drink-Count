import { useToast } from "@chakra-ui/react";
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
  onClose: () => void;
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
          title: "Drink Removed",
          description: `Drink ${drink.name} Removed With Success.`,
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to Removed",
          description: "It was not able to find the Drink, please try again!",
          status: "error",
          isClosable: true,
        });
      }
    }
  }

  function onClose() {
    setAlertIsOpen(false);
  }

  return (
    <AlertContext.Provider
      value={{ isAlertOpen, drink, openAlert, onClose, confirmRemoveDrink }}
    >
      {children}
    </AlertContext.Provider>
  );
}
