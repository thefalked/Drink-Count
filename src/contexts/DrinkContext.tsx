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
import { useLocale } from "../hooks/useLocale";

export type Drink = {
  id: number;
  name: string;
  size: number;
  measure: "oz" | "liters";
  quantity: number;
  price: number;
};

type DrinkContextType = {
  drinks: Drink[];
  createNewDrink: () => void;
  findDrink: (drinkId: number) => Drink | undefined;
  changeDrink: (drink: Drink) => void;
  removeDrink: (drinkId: number) => Drink | undefined;
  changeMesure: (drinkId: number) => void;
  retrieveDrinks: (locale: "en" | "pt-BR") => void;
};

type DrinkContextProviderProps = {
  children: ReactNode;
};

export const DrinkContext = createContext({} as DrinkContextType);

export function DrinkContextProvider({ children }: DrinkContextProviderProps) {
  const [drinks, setDrinks] = useState<Drink[]>([]);

  const toast = useToast();
  const { isLiter } = useLocale();
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
          measure: isLiter ? "liters" : "oz",
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
        drink.measure = changedDrink.measure;
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
      setDrinks([
        {
          id: new Date().getTime(),
          name: "",
          size: 0,
          quantity: 1,
          measure: isLiter ? "liters" : "oz",
          price: 0,
        },
      ]);
    }

    return drink;
  }

  const getUnchangedDrinks = useCallback(() => {
    return drinks.filter(drink => {
      return !isMatch(
        {
          name: "",
          size: 0,
          quantity: 1,
          measure: isLiter ? "liters" : "oz",
          price: 0,
        },
        omit(drink, "id")
      );
    });
  }, [drinks, isLiter]);

  function changeMesure(drinkId: number): void {
    const drink = findDrink(drinkId);

    if (drink) {
      changeDrink({
        ...drink,
        measure: drink.measure === "oz" ? "liters" : "oz",
      });
    }
  }

  const retrieveDrinks = useCallback((locale: "en" | "pt-BR") => {
    const drinksFromCookies = Cookie.getJSON("drink-count:drinks") as Drink[];

    console.log(locale, drinksFromCookies);

    if (locale === "en") {
      if (drinksFromCookies?.length) {
        setDrinks(drinksFromCookies);
      } else {
        setDrinks([
          {
            id: new Date().getTime(),
            name: "",
            size: 0,
            quantity: 1,
            measure: isLiter ? "liters" : "oz",
            price: 0,
          },
        ]);
      }
    }
  }, []);

  useEffect(() => {
    Cookie.set("drink-count:drinks", JSON.stringify(getUnchangedDrinks()));
  }, [drinks, getUnchangedDrinks]);

  return (
    <DrinkContext.Provider
      value={{
        drinks,
        createNewDrink,
        changeDrink,
        removeDrink,
        findDrink,
        changeMesure,
        retrieveDrinks,
      }}
    >
      {children}
    </DrinkContext.Provider>
  );
}
