import { Base64 } from 'js-base64';
import { LOCAL_STORAGE_NAMESPACE } from './constants';

const GITHUB_TOKEN_LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_NAMESPACE}:github_token`;
const REPOS_LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_NAMESPACE}:repositories`;
const GITHUB_API_URL = 'https://api.github.com';

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
    path = '';
  }
  const apiUrl = getApiUrl(`/repos/${repo}/contents/${path}`, branch);
  const response = await fetch(apiUrl, { cache: 'no-cache' });
  const json = await response.json();
  json.content = json.content ? Base64.decode(json.content) : '';
  return json;
}

export async function putContents(repo, path, content, sha, branch) {
  const apiUrl = getApiUrl(`/repos/${repo}/contents/${path}`);

  const body = {
    message: `Music Markdown published ${path}`,
    content: Base64.encode(content),
    branch
  };

  if (sha) {
    body.sha = sha;
  }

  return fetch(apiUrl, { method: 'PUT', mode: 'cors', body: JSON.stringify(body) });
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

async function verifyRepoExists(repo) {
  const apiUrl = getApiUrl(`/repos/${repo}`);
  const response = await fetch(apiUrl);
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
  const apiUrl = getApiUrl(`/repos/${repo}/branches`);
  const response = await fetch(apiUrl);
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
 * Composes the GitHub API url for the given url, attaching the user's GitHub
 * access token if it exists.
 * @param {string} url The path and search params
 * @param {string} branch The branch to get from
 * @return {URL} Composed GitHub API url with user's personal access token
 */
export function getApiUrl(url, branch) {
  url = new URL(url, GITHUB_API_URL);

  const githubToken = localStorage.getItem(GITHUB_TOKEN_LOCAL_STORAGE_KEY);
  if (githubToken) {
    url.searchParams.set('access_token', githubToken);
  }

  if (branch) {
    url.searchParams.set('ref', branch);
  }

  return url;
}
