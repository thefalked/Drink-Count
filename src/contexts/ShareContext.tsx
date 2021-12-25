import { createContext, ReactNode, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDrink } from "../hooks/useDrink";
import { useTranslation } from "next-i18next";

type ShareContextType = {
  addToShare: (id: number) => void;
  removeFromShare: (id: number) => void;
  hasDrinksToShare: () => boolean;
  shareDrinks: () => void;
};

type ShareContextProviderProps = {
  children: ReactNode;
};

export const ShareContext = createContext({} as ShareContextType);

export function ShareContextProvider({ children }: ShareContextProviderProps) {
  const [drinksIds, setDrinksIds] = useState<number[]>([]);

  const { drinks } = useDrink();
  const toast = useToast();
  const { t } = useTranslation("share_context");

  function addToShare(id: number) {
    setDrinksIds([...drinksIds, id]);
  }

  function removeFromShare(id: number) {
    setDrinksIds(drinksIds.filter(drinkId => drinkId !== id));
  }

  function hasDrinksToShare() {
    return drinksIds.length > 0;
  }

  function getDrinksToShare() {
    const drinksToShare = drinksIds.map(id =>
      drinks.find(drink => drink.id === id)
    );

    const drinksToShareInJSON = JSON.stringify(drinksToShare);

    return Buffer.from(drinksToShareInJSON).toString("base64");
  }

  async function shareDrinks() {
    if (hasDrinksToShare()) {
      const sharedUrl = `${window.location.href}?shared=${getDrinksToShare()}`;

      if (navigator.share !== undefined) {
        try {
          await navigator.share({
            title: t("navigator-share-title"),
            text: t("navigator-share-text"),
            url: sharedUrl,
          });

          toast({
            title: t("toast-success-title"),
            description: t("toast-success-description"),
            status: "success",
            isClosable: true,
            duration: 2500,
          });
        } catch (error) {
          console.error("Share error/closed: ", error);
        }
      } else {
        try {
          await navigator.clipboard.writeText(sharedUrl);

          toast({
            title: t("toast-clipboard-success-title"),
            description: t("toast-clipboard-success-description"),
            status: "error",
            isClosable: true,
            duration: 2500,
          });
        } catch (error) {
          console.error("Clipboard error: ", error);
        }
      }
    }
  }

  return (
    <ShareContext.Provider
      value={{
        addToShare,
        removeFromShare,
        hasDrinksToShare,
        shareDrinks,
      }}
    >
      {children}
    </ShareContext.Provider>
  );
}
