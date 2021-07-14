import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import Cookie from "js-cookie";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { isMatch, omit } from "lodash";

export type Drink = {
  id: number;
  name: string;
  size: number;
  quantity: number;
  price: number;
};

type DrinkContextType = {
  drinks: Drink[];
  createNewDrink: () => void;
  findDrink: (drinkId: number) => Drink | undefined;
  changeDrink: (drink: Drink) => void;
  removeDrink: (id: number) => Drink | undefined;
};

type DrinkContextProviderProps = {
  children: ReactNode;
};

export const DrinkContext = createContext({} as DrinkContextType);

const INITIAL_DRINK: Drink = {
  id: new Date().getTime(),
  name: "",
  size: 0,
  quantity: 1,
  price: 0,
};

export function DrinkContextProvider({ children }: DrinkContextProviderProps) {
  const [drinks, setDrinks] = useState<Drink[]>([{ ...INITIAL_DRINK }]);

  const toast = useToast();
  const { t } = useTranslation("drink");

  function createNewDrink() {
    if (getUnchangedDrinks().length !== drinks.length) {
      toast({
        title: t("toast-warning-title"),
        description: t("toast-warning-description"),
        status: "warning",
        isClosable: true,
      });
    } else {
      setDrinks([
        ...drinks,
        {
          id: new Date().getTime(),
          name: "",
          size: 0,
          quantity: 1,
          price: 0,
        },
      ]);

      toast({
        title: t("toast-success-title"),
        description: t("toast-success-description"),
        status: "success",
        isClosable: true,
      });
    }
  }

  function findDrink(drinkId: number) {
    return drinks.find(drink => drink.id === drinkId);
  }

  function changeDrink(changedDrink: Drink) {
    const changedDrinks = drinks.map(drink => {
      if (drink.id === changedDrink.id) {
        drink.name = changedDrink.name;
        drink.price = changedDrink.price;
        drink.quantity = changedDrink.quantity;
        drink.size = changedDrink.size;
      }

      return drink;
    });

    setDrinks(changedDrinks);
  }

  function removeDrink(id: number) {
    const drink = drinks.find(drink => drink.id === id);
    const drinkRemoved = drinks.filter(drink => drink.id !== id);

    if (drinkRemoved.length) {
      setDrinks(drinkRemoved);
    } else {
      setDrinks([{ ...INITIAL_DRINK }]);
    }

    return drink;
  }

  const getUnchangedDrinks = useCallback(() => {
    return drinks.filter(drink => {
      return !isMatch(omit(INITIAL_DRINK, "id"), omit(drink, "id"));
    });
  }, [drinks]);

  useEffect(() => {
    const drinksFromCookies = Cookie.getJSON("drink-count:drinks") as Drink[];

    if (drinksFromCookies?.length) {
      setDrinks(drinksFromCookies);
    } else {
      setDrinks([{ ...INITIAL_DRINK }]);
    }
  }, []);

  useEffect(() => {
    Cookie.set("drink-count:drinks", JSON.stringify(getUnchangedDrinks()));
  }, [drinks, getUnchangedDrinks]);

  return (
    <DrinkContext.Provider
      value={{ drinks, createNewDrink, changeDrink, removeDrink, findDrink }}
    >
      {children}
    </DrinkContext.Provider>
  );
}
