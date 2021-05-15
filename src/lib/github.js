import { Base64 } from "js-base64";
import { LOCAL_STORAGE_NAMESPACE } from "./constants";

const GITHUB_TOKEN_LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_NAMESPACE}:github_token`;
const REPOS_LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_NAMESPACE}:repositories`;
const GITHUB_API_URL = "https://api.github.com";
const REPOS_CONTENTS_TREE_STORAGE_KEY = `${LOCAL_STORAGE_NAMESPACE}:indexed-contents`;

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
 * @return {Array} Array of JSON dictionaries of repos
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
 * Indexes all contents from stored repositories for searching
 * TODO: Consider when a full refresh should be called. Currently, it's invoked when
 * a repository is first accessed. However, there should be a manual trigger to allow
 * a manual refresh of external repos.
 */
export async function refreshIndexedContents() {
  let reposContents = [];
  for (const repo of await getRepositories()) {
    const repoContents = await getRepoContents(repo);
    reposContents.push(repoContents);
  }
  localStorage.setItem(REPOS_CONTENTS_TREE_STORAGE_KEY, reposContents);
}

/**
 * Returns all file contents in a particular github repo for all branches
 * @param {string} repo The owner and repo in the form :owner/:repo
 * @return {string|Array} List of contents in a repo
 */
export async function getRepoContents(repo) {
  let repoContents = [];
  for (const branch of await getBranches(repo)) {
    const branchContents = await getBranchContents(repo, "/", branch.name);
    repoContents.push(branchContents);
  }
  return repoContents;
}

/**
 * Returns all file contents from a repo's specific branch
 * @param {string} repo The owner and repo in the form :owner/:repo
 * @param {string} path Subdirectory in repo to traverse
 * @param {string} branch Name of branch in repo to traverse
 * @return {Array<string>} Array of file contents paths
 */
async function getBranchContents(repo, path, branch) {
  let branchContents = [];
  for (const item of await getContents(repo, path, branch)) {
    if (item.type === "file") {
      branchContents.push(`${repo}/${branch}/${item.path}`);
    } else if (item.type === "dir") {
      branchContents.push(await getBranchContents(repo, item.path, branch));
    }
  }
  return branchContents;
}

async function verifyRepoExists(repo) {
  const response = await githubApiFetch(`/repos/${repo}`);
  if (response.status === 404) {
    throw new Error(`"${repo}" not found on GitHub.`);
  }
}

function verifyRepoUnregistered(repo) {
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
