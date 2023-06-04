import { Base64 } from "js-base64";
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { gitHubApiFetch, isValidGithubToken } from "../lib/github";
import { useLocalStorage } from "../lib/hooks";

interface GitHubApiContextValue {
  gitHubToken: string;
  setGitHubToken: (token: string) => void;
}

const GitHubApiContext = createContext<GitHubApiContextValue>({
  gitHubToken: "",
  setGitHubToken: () => {},
});

export const useGitHubApi = () => useContext(GitHubApiContext);

interface GitHubApiProviderProps {
  children: React.ReactNode;
}

export const GitHubApiProvider: FC<GitHubApiProviderProps> = ({ children }) => {
  const [gitHubToken, setGitHubToken] = useLocalStorage("gitHubToken", "");

  const validateAndSetToken = (token: string) => {
    if (token && !isValidGithubToken(token)) {
      throw new Error(`"${token}" is not valid.`);
    }
    setGitHubToken(token);
  };

  return (
    <GitHubApiContext.Provider
      value={{ gitHubToken, setGitHubToken: validateAndSetToken }}
    >
      {children}
    </GitHubApiContext.Provider>
  );
};

function useGitHubFetch<T>(path: string, defaultValue: T) {
  const { gitHubToken } = useGitHubApi();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<T>(defaultValue);

  const load = useCallback(async () => {
    setLoading(true);
    const response = await gitHubApiFetch(path, {
      gitHubToken,
      cache: "no-cache",
    });
    setValue(await response.json());
    setLoading(false);
  }, [path, gitHubToken]);

  useEffect(() => {
    load();
  }, [path, load, gitHubToken]);

  return { loading, load, value };
}

export interface RepositoryContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: "file" | "dir" | "symlink";
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

export interface FileContent extends RepositoryContent {
  type: "file";
  content: string;
  encoding: "base64";
}

export interface FolderContent extends RepositoryContent {
  type: "dir";
}

const EMPTY_FILE_CONTENT: FileContent = {
  name: "",
  path: "",
  sha: "",
  size: 0,
  url: "",
  html_url: "",
  git_url: "",
  download_url: "",
  type: "file",
  content: "",
  encoding: "base64",
  _links: {
    self: "",
    git: "",
    html: "",
  },
};

export function useFileContent(repo: string, path: string, branch: string) {
  const { loading, load, value } = useGitHubFetch<FileContent>(
    `/repos/${repo}/contents/${path}?ref=${branch}`,
    EMPTY_FILE_CONTENT
  );
  if (value.type !== "file") {
    throw new Error(`"${path}" is not a file.`);
  }
  const content = value.content ? Base64.decode(value.content) : "";
  return { loading, load, value, content };
}

export function useFolderContents(repo: string, path: string, branch: string) {
  const { loading, load, value } = useGitHubFetch<RepositoryContent[]>(
    `/repos/${repo}/contents/${path || ""}?ref=${branch}`,
    []
  );
  return { loading, load, value };
}

interface RepositoryTree {
  path: string;
  mode: string;
  type: "blob" | "tree" | "commit";
  sha: string;
  size: number;
  url: string;
}

interface RepositoryTrees {
  sha: string;
  url: string;
  tree: RepositoryTree[];
  truncated: boolean;
}

const EMPTY_TREES: RepositoryTrees = {
  sha: "",
  url: "",
  tree: [],
  truncated: false,
};

export function useTrees(repo: string, branch: string) {
  const { loading, value } = useGitHubFetch<RepositoryTrees>(
    `/repos/${repo}/git/trees/${branch}?recursive=1`,
    EMPTY_TREES
  );
  const files = value.tree.map((tree) => tree.path);
  return { loading, value, files };
}

interface RepositoryBranch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

const EMPTY_BRANCHES: RepositoryBranch[] = [];

export function useBranches(repo: string) {
  const { loading, value } = useGitHubFetch<RepositoryBranch[]>(
    `/repos/${repo}/branches`,
    EMPTY_BRANCHES
  );
  return { loading, value };
}
