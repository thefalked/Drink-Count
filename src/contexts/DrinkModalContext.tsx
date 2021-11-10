import { useToast } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { createContext, MutableRefObject, ReactNode, useState } from "react";

import type { Drink } from "./DrinkContext";

import { useDrink } from "../hooks/useDrink";

type DrinkModalContextType = {
  isDrinkModalOpen: boolean;
  openDrinkModal: (drinkId: number, ref: MutableRefObject<null>) => void;
  handleCloseModal: () => void;
  finalRefDrink: MutableRefObject<null> | undefined;
  drink: Drink | undefined;
  handleChangeDrinkModal: (drink: Drink) => void;
};

type DrinkModalContextProviderProps = {
  children: ReactNode;
};

export const DrinkModalContext = createContext({} as DrinkModalContextType);

export function DrinkModalContextProvider({
  children,
}: DrinkModalContextProviderProps) {
  const [isDrinkModalOpen, setIsDrinkModalOpen] = useState(false);
  const [finalRefDrink, setFinalRefDrink] = useState<MutableRefObject<null>>();

  const [drink, setDrink] = useState<Drink>();

  const { findDrink, changeDrink } = useDrink();
  const toast = useToast();
  const { t } = useTranslation("drink_modal");

  function openDrinkModal(drinkId: number, ref: MutableRefObject<null>) {
    const drinkRetrieved = findDrink(drinkId);

    setDrink(drinkRetrieved);

    setFinalRefDrink(ref);

    setIsDrinkModalOpen(true);
  }

  function handleChangeDrinkModal(drink: Drink): void {
    changeDrink(drink);

    toast({
      title: t("toast-success-title"),
      description: t("toast-success-description"),
      status: "success",
      isClosable: true,
      duration: 2500,
    });

    setIsDrinkModalOpen(false);
  }

  function handleCloseModal() {
    setIsDrinkModalOpen(false);
  }

  return (
    <DrinkModalContext.Provider
      value={{
        isDrinkModalOpen,
        openDrinkModal,
        handleCloseModal,
        finalRefDrink,
        drink,
        handleChangeDrinkModal,
      }}
    >
      {children}
    </DrinkModalContext.Provider>
  );
}
