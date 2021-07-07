import { createContext, ReactNode, useState } from "react";

type Drink = {
  id: number;
  name: string;
  size: number;
  price: number;
};

type DrinkContextType = {
  drinks: Drink[];
  createNewDrink: () => void;
  changeDrink: (drink: Drink) => void;
  removeDrink: (id: number) => void;
};

type DrinkContextProviderProps = {
  children: ReactNode;
};

export const DrinkContext = createContext({} as DrinkContextType);

const INITIAL_DRINK: Drink = {
  id: new Date().getTime(),
  name: "heineken",
  size: 0,
  price: 0,
};

export function DrinkContextProvider({ children }: DrinkContextProviderProps) {
  const [drinks, setDrinks] = useState<Drink[]>([INITIAL_DRINK]);

  function createNewDrink() {
    setDrinks([
      ...drinks,
      {
        id: new Date().getTime(),
        name: "heineken",
        size: 0,
        price: 0,
      },
    ]);
  }

  function changeDrink(changedDrink: Drink) {
    const changedDrinks = drinks.map(drink => {
      if (drink.id === changedDrink.id) {
        drink.name = changedDrink.name;
        drink.price = changedDrink.price;
        drink.size = changedDrink.size;
      }

      return drink;
    });

    setDrinks(changedDrinks);
  }

  function removeDrink(id: number) {
    const drinkRemoved = drinks.filter(drink => drink.id !== id);

    setDrinks(drinkRemoved);
  }

  return (
    <DrinkContext.Provider
      value={{ drinks, createNewDrink, changeDrink, removeDrink }}
    >
      {children}
    </DrinkContext.Provider>
  );
}
