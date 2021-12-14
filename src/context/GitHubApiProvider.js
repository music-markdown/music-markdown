import { Base64 } from "js-base64";
import { createContext, useContext, useEffect, useState } from "react";
import { gitHubApiFetch, isValidGithubToken } from "../lib/github";
import { useLocalStorage } from "../lib/hooks";

const GitHubApiContext = createContext();

export const useGitHubApi = () => useContext(GitHubApiContext);

export function GitHubApiProvider({ children }) {
  const [gitHubToken, setGitHubToken] = useLocalStorage("gitHubToken", "");

  const validateAndSetToken = (token) => {
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
}

export function useGitHubFetch(path, defaultValue) {
  const { gitHubToken } = useGitHubApi();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setLoading(true);

    const doFetch = async () => {
      const response = await gitHubApiFetch(path, {
        gitHubToken,
        cache: "no-cache",
      });
      setValue(await response.json());
      setLoading(false);
    };
    doFetch();
  }, [path, gitHubToken]);

  return { loading, value };
}

export function useContents(repo, path, branch) {
  const { loading, value } = useGitHubFetch(
    `/repos/${repo}/contents/${path || ""}?ref=${branch}`
  );
  const content = value?.content ? Base64.decode(value.content) : "";
  return { loading, value, content };
}
