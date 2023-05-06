import { Base64 } from "js-base64";

const GITHUB_API_URL = "https://api.github.com";

interface GitHubFile {
  message: string;
  content: string;
  branch: string;
  sha?: string;
}

export async function putContents(
  repo: string,
  path: string,
  content: string,
  sha: string,
  branch: string,
  gitHubToken: string
) {
  const body: GitHubFile = {
    message: `Music Markdown published ${path}`,
    content: Base64.encode(content),
    branch,
  };

  if (sha) {
    body.sha = sha;
  }

  return gitHubApiFetch(`/repos/${repo}/contents/${path}`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(body),
    gitHubToken,
  });
}

/**
 * Returns the list of repo names and corresponding GitHub metadata.
 */
export async function getRepoMetadata(
  repos: string[],
  { gitHubToken }: Options
) {
  return Promise.all(
    repos.map(async (repo) =>
      (await gitHubApiFetch(`/repos/${repo}`, { gitHubToken })).json()
    )
  );
}

export async function verifyRepoExists(repo: string, { gitHubToken }: Options) {
  const response = await gitHubApiFetch(`/repos/${repo}`, { gitHubToken });
  if (response.status === 404) {
    throw new Error(`"${repo}" not found on GitHub.`);
  }
}

export function isValidGithubToken(gitHubToken: string | null) {
  return (
    !!gitHubToken &&
    (!!gitHubToken.match(/^[0-9a-f]{40}$/) ||
      !!gitHubToken.match(/^ghp_[a-zA-Z0-9]{36}$/))
  );
}

interface Options extends RequestInit {
  gitHubToken?: string;
}

/**
 * Performs a fetch to the GitHub API.
 */
export async function gitHubApiFetch(
  path: string,
  { gitHubToken, ...init }: Options
) {
  const input = new URL(path, GITHUB_API_URL);

  if (gitHubToken) {
    init = {
      ...init,
      ...{ headers: { Authorization: `token ${gitHubToken}` } },
    };
  }

  return fetch(new Request(input, init));
}
