import { createContext, useContext, useState } from "react";

const YouTubeIdContext = createContext();

export const useYouTubeId = () => useContext(YouTubeIdContext);

export function YouTubeIdProvider({ children }) {
  const [youTubeId, setYouTubeId] = useState(null);
  return (
    <YouTubeIdContext.Provider value={{ youTubeId, setYouTubeId }}>
      {children}
    </YouTubeIdContext.Provider>
  );
}
