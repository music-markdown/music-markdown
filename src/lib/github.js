import { Base64 } from "js-base64";
import { LOCAL_STORAGE_NAMESPACE } from "./constants";

const GITHUB_TOKEN_LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_NAMESPACE}:github_token`;
const REPOS_LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_NAMESPACE}:repositories`;
const GITHUB_API_URL = "https://api.github.com";

/**
 * Returns a Promise of the contents of a file or directory in a GitHub repository.
 * See https://developer.github.com/v3/repos/contents/#get-contents
 * @param {string} repo The owner and repo in the form :owner/:repo
 * @param {string} path The directory or file to retrieve
 * @param {string} branch The branch to retrive contents from
 * @return {Object} JSON dictionary of repository contents
 */
export async function getContents(repo, path, branch) {
  if (path === undefined || path.length === 0) {
    path = "";
  }
  const response = await githubApiFetch(
    `/repos/${repo}/contents/${path}`,
    { cache: "no-cache" },
    branch
  );
  const json = await response.json();
  json.content = json.content ? Base64.decode(json.content) : "";
  return json;
}

export async function putContents(repo, path, content, sha, branch) {
  const body = {
    message: `Music Markdown published ${path}`,
    content: Base64.encode(content),
    branch,
  };

  if (sha) {
    body.sha = sha;
  }

  return githubApiFetch(`/repos/${repo}/contents/${path}`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(body),
  });
}

/**
 * Returns list of repos stored in localStorage.
 * @return {Array} Array of repo names
 */
export function getRepositories() {
  const repoListStr = localStorage.getItem(REPOS_LOCAL_STORAGE_KEY);
  if (repoListStr) {
    return JSON.parse(repoListStr);
  } else {
    return [];
  }
}

/**
 * Returns the list of repo names and corresponding GitHub metadata.
 * @returns {Array} Array of JSON dictionaries of repos
 */
export async function getRepoMetadata(repos) {
  return Promise.all(
    repos.map(async (repo) => (await githubApiFetch(`/repos/${repo}`)).json())
  );
}

export async function getRepoTrees(repo, branch) {
  const response = await githubApiFetch(
    `/repos/${repo}/git/trees/${branch}?recursive=1`
  );
  return response.json();
}

export async function verifyRepoExists(repo) {
  const response = await githubApiFetch(`/repos/${repo}`);
  if (response.status === 404) {
    throw new Error(`"${repo}" not found on GitHub.`);
  }
}

export function verifyRepoUnregistered(repo) {
  for (const r of getRepositories()) {
    if (r === repo) {
      throw new Error(`"${repo}" is already registered.`);
    }
  }
}

/**
 * Adds a desired GitHub repo to localStorage.
 * @param {string} repo The owner and repo in the form :owner/:repo
 */
export async function addRepository(repo) {
  verifyRepoUnregistered(repo);
  await verifyRepoExists(repo);
  const repos = getRepositories();
  repos.push(repo);
  localStorage.setItem(REPOS_LOCAL_STORAGE_KEY, JSON.stringify(repos));
}

/**
 * Returns a promise of a list of branches for the given repository.
 * @param {string} repo The owner and repo in the form :owner/:repo
 */
export async function getBranches(repo) {
  const response = await githubApiFetch(`/repos/${repo}/branches`);
  return response.json();
}

/**
 * Removes a GitHub repo from localStorage.
 * @param {string} repo The owner and repo in the form :owner/:repo
 */
export function deleteRepository(repo) {
  const repos = getRepositories().filter((r) => r !== repo);
  localStorage.setItem(REPOS_LOCAL_STORAGE_KEY, JSON.stringify(repos));
}

/**
 * Performs a fetch to the GitHub API, attaching the user's GitHub access
 * token if it is set.
 */
async function githubApiFetch(path, init, branch) {
  const input = new URL(path, GITHUB_API_URL);
  if (branch) {
    input.searchParams.set("ref", branch);
  }

  const githubToken = getGithubToken();
  if (githubToken) {
    init = {
      ...init,
      ...{ headers: { Authorization: `token ${githubToken}` } },
    };
  }

  return fetch(new Request(input, init));
}

export function getGithubToken() {
  return localStorage.getItem(GITHUB_TOKEN_LOCAL_STORAGE_KEY);
}

export function isValidGithubToken(githubToken = getGithubToken()) {
  return (
    !!githubToken &&
    (!!githubToken.match(/^[0-9a-f]{40}$/) ||
      !!githubToken.match(/^ghp_[a-zA-Z0-9]{36}$/))
  );
}

export function setGithubToken(githubToken) {
  if (githubToken) {
    localStorage.setItem(GITHUB_TOKEN_LOCAL_STORAGE_KEY, githubToken);
  } else {
    localStorage.removeItem(GITHUB_TOKEN_LOCAL_STORAGE_KEY);
  }
}
