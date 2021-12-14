import { Base64 } from "js-base64";

const GITHUB_API_URL = "https://api.github.com";

export async function putContents(
  repo,
  path,
  content,
  sha,
  branch,
  gitHubToken
) {
  const body = {
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
 * @returns {Array} Array of JSON dictionaries of repos
 */
export async function getRepoMetadata(repos, { gitHubToken }) {
  return Promise.all(
    repos.map(async (repo) =>
      (await gitHubApiFetch(`/repos/${repo}`, { gitHubToken })).json()
    )
  );
}

export async function verifyRepoExists(repo, { gitHubToken }) {
  const response = await gitHubApiFetch(`/repos/${repo}`, { gitHubToken });
  if (response.status === 404) {
    throw new Error(`"${repo}" not found on GitHub.`);
  }
}

export function isValidGithubToken(gitHubToken) {
  return (
    !!gitHubToken &&
    (!!gitHubToken.match(/^[0-9a-f]{40}$/) ||
      !!gitHubToken.match(/^ghp_[a-zA-Z0-9]{36}$/))
  );
}

/**
 * Performs a fetch to the GitHub API.
 */
export async function gitHubApiFetch(path, { gitHubToken, ...init }) {
  const input = new URL(path, GITHUB_API_URL);

  if (gitHubToken) {
    init = {
      ...init,
      ...{ headers: { Authorization: `token ${gitHubToken}` } },
    };
  }

  return fetch(new Request(input, init));
}
