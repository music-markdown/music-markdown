import { createContext, FC, useContext, useState } from "react";

interface YouTubeIdContextValue {
  youTubeId: string | null;
  setYouTubeId: (youTubeId: string | null) => void;
}

const YouTubeIdContext = createContext<YouTubeIdContextValue>({
  youTubeId: null,
  setYouTubeId: () => {},
});

export const useYouTubeId = () => useContext(YouTubeIdContext);

interface YouTubeIdProviderProps {
  children: React.ReactNode;
}

export const YouTubeIdProvider: FC<YouTubeIdProviderProps> = ({ children }) => {
  const [youTubeId, setYouTubeId] = useState<string | null>(null);
  return (
    <YouTubeIdContext.Provider value={{ youTubeId, setYouTubeId }}>
      {children}
    </YouTubeIdContext.Provider>
  );
};
