import { useToast } from "@chakra-ui/react";
import { createContext, MutableRefObject, ReactNode, useState } from "react";

import type { Drink } from "./DrinkContext";

import { useDrink } from "../hooks/useDrink";

type DrinkModalContextType = {
  isDrinkModalOpen: boolean;
  openDrinkModal: (drinkId: number, ref: MutableRefObject<null>) => void;
  handleCloseModal: () => void;
  finalRefDrink: MutableRefObject<null> | undefined;
  drink: Drink | undefined;
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

  function openDrinkModal(drinkId: number, ref: MutableRefObject<null>) {
    const drinkRetrieved = findDrink(drinkId);

    setDrink(drinkRetrieved);

    setFinalRefDrink(ref);

    setIsDrinkModalOpen(true);
  }

  // function confirmRemoveDrink() {
  //   if (drink) {
  //     const drinkRemoved = removeDrink(drink.id);

  //     if (drinkRemoved) {
  //       setIsDrinkModalOpen(false);
  //       toast({
  //         title: "Drink Removed",
  //         description: `Drink ${drink.name} Removed With Success.`,
  //         status: "success",
  //         isClosable: true,
  //       });
  //     } else {
  //       toast({
  //         title: "Failed to Removed",
  //         description: "It was not able to find the Drink, please try again!",
  //         status: "error",
  //         isClosable: true,
  //       });
  //     }
  //   }
  // }

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
      }}
    >
      {children}
    </DrinkModalContext.Provider>
  );
}
