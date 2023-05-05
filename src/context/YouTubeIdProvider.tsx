import { createContext, FC, useContext, useState } from "react";

const YouTubeIdContext = createContext({});

export const useYouTubeId = () => useContext(YouTubeIdContext);

interface YouTubeIdProviderProps {
  children: React.ReactNode;
}

export const YouTubeIdProvider: FC<YouTubeIdProviderProps> = ({ children }) => {
  const [youTubeId, setYouTubeId] = useState(null);
  return (
    <YouTubeIdContext.Provider value={{ youTubeId, setYouTubeId }}>
      {children}
    </YouTubeIdContext.Provider>
  );
};
