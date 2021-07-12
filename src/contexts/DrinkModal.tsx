import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useState } from "react";

import type { Drink } from "./DrinkContext";

import { useDrink } from "../hooks/useDrink";

type DrinkModalContextType = {
  isModalOpen: boolean;
  openDrinkModal: (drinkId: number) => void;
  handleCloseModal: () => void;
};

type DrinkModalContextProviderProps = {
  children: ReactNode;
};

export const DrinkModalContext = createContext({} as DrinkModalContextType);

export function DrinkModalContextProvider({
  children,
}: DrinkModalContextProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drink, setDrink] = useState<Drink>();

  const { drinks, changeDrink } = useDrink();
  const toast = useToast();

  function openDrinkModal(drinkId: number) {
    setDrink(drink);
    setIsModalOpen(true);
  }

  // function confirmRemoveDrink() {
  //   if (drink) {
  //     const drinkRemoved = removeDrink(drink.id);

  //     if (drinkRemoved) {
  //       setIsModalOpen(false);
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
    setIsModalOpen(false);
  }

  return (
    <DrinkModalContext.Provider
      value={{
        isModalOpen,
        openDrinkModal,
        handleCloseModal,
      }}
    >
      {children}
    </DrinkModalContext.Provider>
  );
}
