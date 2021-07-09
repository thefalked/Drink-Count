import { createContext, ReactNode, useState } from "react";

type MainMenuContextType = {
  isMainMenuOpen: boolean;
  onToggleMainMenu: () => void;
};

type MainMenuContextProviderProps = {
  children: ReactNode;
};

export const MainMenuContext = createContext({} as MainMenuContextType);

export function MainMenuContextProvider({
  children,
}: MainMenuContextProviderProps) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  function onToggleMainMenu() {
    setIsMainMenuOpen(!isMainMenuOpen);
  }

  return (
    <MainMenuContext.Provider value={{ isMainMenuOpen, onToggleMainMenu }}>
      {children}
    </MainMenuContext.Provider>
  );
}
