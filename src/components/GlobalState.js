import { createContext, useContext, useEffect, useState } from "react";
import {
  getGithubToken,
  getRepoMetadata,
  isValidGithubToken,
  setGithubToken,
  verifyRepoExists,
  verifyRepoUnregistered,
} from "../lib/github";

import { LOCAL_STORAGE_NAMESPACE } from "../lib/constants";
import { useLocalStorage } from "../lib/hooks";
import { useMediaQuery } from "@mui/material";

const REPOS_LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_NAMESPACE}:repositories`;

const THEMES = {
  light: {
    palette: {
      mode: "light",
    },
  },
  dark: {
    palette: {
      mode: "dark",
    },
  },
};

export const GlobalStateContext = createContext();

export const GlobalStateProvider = (props) => {
  const [state, setState] = useState({
    githubToken: getGithubToken(),
  });

  const [repos, setRepos] = useLocalStorage(REPOS_LOCAL_STORAGE_KEY, []);
  const [themeName, setThemeName] = useLocalStorage("themeName", "system");
  const [youTubeId, setYouTubeId] = useState(null);

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
        youTubeId,
        setYouTubeId,
        themeName,
        setThemeName,
        repositories: repos,
        setRepositories: setRepos,
        addRepository: async (repo) => {
          verifyRepoUnregistered(repo);
          await verifyRepoExists(repo);
          setRepos(repos.concat([repo]));
        },
        deleteRepository: (repo) => {
          setRepos(repos.filter((r) => r !== repo));
        },
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalStateContext = () => useContext(GlobalStateContext);

export function useTheme() {
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const { themeName, setThemeName } = useGlobalStateContext();
  const getEffectiveThemeName = () => {
    if (themeName === "system") {
      return prefersDarkTheme ? "dark" : "light";
    }
    return themeName;
  };
  const getTheme = () => THEMES[getEffectiveThemeName()];
  return {
    themeName,
    setThemeName,
    prefersDarkTheme,
    getEffectiveThemeName,
    getTheme,
  };
}

export function useRepoMetadata() {
  const [repoMetadata, setRepoMetadata] = useState([]);
  const { repositories } = useRepositories();

  useEffect(() => {
    (async () => setRepoMetadata(await getRepoMetadata(repositories)))();
  }, [repositories]);

  return repoMetadata;
}

export function useRepositories() {
  const context = useGlobalStateContext();
  return {
    repositories: context.repositories,
    setRepositories: context.setRepositories,
    addRepository: context.addRepository,
    deleteRepository: context.deleteRepository,
  };
}

export function useYouTubeId() {
  const context = useGlobalStateContext();
  return {
    youTubeId: context.youTubeId,
    setYouTubeId: context.setYouTubeId,
  };
}
