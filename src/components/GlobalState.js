import React, { useContext, useState } from "react";
import {
  getGithubToken,
  isValidGithubToken,
  setGithubToken,
} from "../lib/github";
import { LOCAL_STORAGE_NAMESPACE } from "../lib/constants";

const lightTheme = {
  palette: {
    type: "light",
  },
};

const darkTheme = {
  palette: {
    type: "dark",
  },
};

const initialTheme =
  window.localStorage.getItem(`${LOCAL_STORAGE_NAMESPACE}:palette-type`) ===
  "dark"
    ? darkTheme
    : lightTheme;

export const GlobalStateContext = React.createContext();

export const useGlobalStateContext = () => useContext(GlobalStateContext);

export const GlobalStateProvider = (props) => {
  const [state, setState] = useState({
    githubToken: getGithubToken(),
    theme: initialTheme,
    youTubeId: null,
  });

  return (
    <GlobalStateContext.Provider
      value={{
        data: state,
        isValidGithubToken: () => isValidGithubToken(state.githubToken),
        setGithubToken: (githubToken) => {
          if (githubToken !== state.githubToken) {
            setState({ ...state, githubToken });
            setGithubToken(githubToken);
          }
        },
        isDarkTheme: () => state.theme.palette.type === "dark",
        toggleTheme: () => {
          const theme =
            state.theme.palette.type === "dark" ? lightTheme : darkTheme;
          window.localStorage.setItem(
            `${LOCAL_STORAGE_NAMESPACE}:palette-type`,
            theme.palette.type
          );
          setState({ ...state, theme });
        },
        setYouTubeId: (youTubeId) => {
          if (youTubeId !== state.youTubeId) {
            setState({ ...state, youTubeId });
          }
        },
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};
