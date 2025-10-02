import { createContext, useContext, useEffect, useState } from "react";

type ColorBlindMode = "normal" | "deuteranopia" | "protanopia" | "tritanopia";

type ColorBlindProviderProps = {
  children: React.ReactNode;
  defaultMode?: ColorBlindMode;
  storageKey?: string;
};

type ColorBlindProviderState = {
  colorBlindMode: ColorBlindMode;
  setColorBlindMode: (mode: ColorBlindMode) => void;
};

const initialState: ColorBlindProviderState = {
  colorBlindMode: "normal",
  setColorBlindMode: () => null,
};

const ColorBlindProviderContext = createContext<ColorBlindProviderState>(initialState);

export function ColorBlindProvider({
  children,
  defaultMode = "normal",
  storageKey = "jd-access-colorblind",
  ...props
}: ColorBlindProviderProps) {
  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindMode>(
    () => (localStorage.getItem(storageKey) as ColorBlindMode) || defaultMode
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("cb-deuteranopia", "cb-protanopia", "cb-tritanopia");

    if (colorBlindMode !== "normal") {
      root.classList.add(`cb-${colorBlindMode}`);
    }
  }, [colorBlindMode]);

  const value = {
    colorBlindMode,
    setColorBlindMode: (mode: ColorBlindMode) => {
      localStorage.setItem(storageKey, mode);
      setColorBlindMode(mode);
    },
  };

  return (
    <ColorBlindProviderContext.Provider {...props} value={value}>
      {children}
    </ColorBlindProviderContext.Provider>
  );
}

export const useColorBlind = () => {
  const context = useContext(ColorBlindProviderContext);

  if (context === undefined)
    throw new Error("useColorBlind must be used within a ColorBlindProvider");

  return context;
};
