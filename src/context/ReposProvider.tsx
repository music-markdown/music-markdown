import { createContext, FC, useContext, useEffect, useState } from "react";
import { getRepoMetadata, RepoMetadata, verifyRepoExists } from "../lib/github";
import { useLocalStorage } from "../lib/hooks";
import { useGitHubApi } from "./GitHubApiProvider";

interface ReposContextValue {
  repos: string[];
  setRepos: (repos: string[]) => void;
  addRepo: (repo: string) => Promise<void>;
  deleteRepo: (repo: string) => void;
}

const ReposContext = createContext<ReposContextValue>({
  repos: [],
  setRepos: () => {},
  addRepo: () => Promise.resolve(),
  deleteRepo: () => {},
});

export const useRepos = () => useContext(ReposContext);

export function useRepoMetadata() {
  const [repoMetadata, setRepoMetadata] = useState<RepoMetadata[]>([]);
  const { repos } = useRepos();
  const { gitHubToken } = useGitHubApi();

  useEffect(() => {
    const fetchData = async () => {
      const repoMetadata = await getRepoMetadata(repos, { gitHubToken });
      setRepoMetadata(repoMetadata);
    };
    fetchData();
  }, [repos, gitHubToken]);

  return repoMetadata;
}

interface ReposProviderProps {
  children: React.ReactNode;
}

export const ReposProvider: FC<ReposProviderProps> = ({ children }) => {
  const [repos, setRepos] = useLocalStorage<string[]>("repos", []);
  const { gitHubToken } = useGitHubApi();

  const addRepo = async (repo: string) => {
    if (repos.includes(repo)) {
      throw new Error(`"${repo}" is already registered.`);
    }
    await verifyRepoExists(repo, { gitHubToken });
    setRepos([...repos, repo]);
  };

  const deleteRepo = (repo: string) => {
    setRepos(repos.filter((r) => r !== repo));
  };

  return (
    <ReposContext.Provider value={{ repos, setRepos, addRepo, deleteRepo }}>
      {children}
    </ReposContext.Provider>
  );
};
