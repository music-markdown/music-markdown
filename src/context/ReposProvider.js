import { createContext, useContext, useEffect, useState } from "react";
import { getRepoMetadata, verifyRepoExists } from "../lib/github";
import { useLocalStorage } from "../lib/hooks";
import { useGitHubApi } from "./GitHubApiProvider";

const ReposContext = createContext();

export const useRepos = () => useContext(ReposContext);

export function useRepoMetadata() {
  const [repoMetadata, setRepoMetadata] = useState([]);
  const { repos } = useRepos();
  const { gitHubToken } = useGitHubApi();

  useEffect(() => {
    (async () =>
      setRepoMetadata(await getRepoMetadata(repos, { gitHubToken })))();
  }, [repos, gitHubToken]);

  return repoMetadata;
}

export function ReposProvider({ children }) {
  const [repos, setRepos] = useLocalStorage("repos", []);
  const { gitHubToken } = useGitHubApi();

  const addRepo = async (repo) => {
    if (repos.includes(repo)) {
      throw new Error(`"${repo}" is already registered.`);
    }
    await verifyRepoExists(repo, { gitHubToken });
    setRepos([...repos, repo]);
  };

  const deleteRepo = (repo) => {
    setRepos(repos.filter((r) => r !== repo));
  };

  return (
    <ReposContext.Provider value={{ repos, setRepos, addRepo, deleteRepo }}>
      {children}
    </ReposContext.Provider>
  );
}
