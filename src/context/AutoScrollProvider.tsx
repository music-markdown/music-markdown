import { createContext, FC, useContext, useState } from "react";

interface AutoScrollContextValue {
  autoScroll: string | null;
  setAutoScroll: (autoScroll: string | null) => void;
}

const AutoScrollContext = createContext<AutoScrollContextValue>({
  autoScroll: null,
  setAutoScroll: () => {},
});

export const useAutoScroll = () => useContext(AutoScrollContext);

interface AutoScrollProviderProps {
  children: React.ReactNode;
}

export const AutoScrollProvider: FC<AutoScrollProviderProps> = ({
  children,
}) => {
  const [autoScroll, setAutoScroll] = useState<string | null>(null);
  return (
    <AutoScrollContext.Provider value={{ autoScroll, setAutoScroll }}>
      {children}
    </AutoScrollContext.Provider>
  );
};
