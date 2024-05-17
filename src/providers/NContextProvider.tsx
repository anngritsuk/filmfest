import { useState, createContext, PropsWithChildren } from "react";

type NContextType = [number, React.Dispatch<React.SetStateAction<number>>];

export const NContext = createContext<NContextType>([5, () => {}]);

function NContextProvider({ children }: PropsWithChildren<{}>) {
  const [N, setN] = useState(5);

  return <NContext.Provider value={[N, setN]}>{children}</NContext.Provider>;
}

export default NContextProvider;
