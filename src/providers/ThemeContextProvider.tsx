import { useState, createContext, PropsWithChildren } from "react";

type ContextType = [string, (color: string) => void];

export const ThemeContext = createContext<ContextType>(["", () => {}]);

function ThemeContextProvider({ children }: PropsWithChildren<{}>) {
  const [color, setColor] = useState("dark");

  return (
    <ThemeContext.Provider value={[color, setColor]}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
