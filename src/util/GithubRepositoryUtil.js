import { REPOS_LOCAL_STORAGE_KEY, GITHUB_TOKEN_LOCAL_STORAGE_KEY } from './Constants';

/**
 * Returns a Promise of the contents of a file or directory in a GitHub repository.
 * See https://developer.github.com/v3/repos/contents/#get-contents
 * @param {string} owner Account owner of the repo
 * @param {string} repo Repo name
 * @param {string} path The directory or file to retrieve
 * @return {Object} JSON dictionary of repository contents
 */
export async function getContents(owner, repo, path) {
  const apiUrl = getApiUrl(`/repos/${owner}/${repo}/contents/${path}`);
  const response = await fetch(apiUrl);
  return response.json();
}

/**
 * Returns list of repos stored in localStorage
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
 * Adds a desired Github repo to localStorage
 * @param {string} owner Repo owner
 * @param {string} repo Repo name
 * @param {string} path Subdirectory
 */
export function addRepository(owner, repo, path) {
  const repoMap = {
    'owner': owner,
    'repo': repo,
    'path': path
  };
  const storedRepos = getRepositories();
  const repoList = storedRepos.length > 0 ? storedRepos : [];
  repoList.push(repoMap);
  localStorage.setItem(REPOS_LOCAL_STORAGE_KEY, JSON.stringify(repoList));
}

export function getApiUrl(url) {
  url = new URL(url, 'https://api.github.com');

  const githubToken = localStorage.getItem(GITHUB_TOKEN_LOCAL_STORAGE_KEY);
  if (githubToken) {
    url.searchParams.set('access_token', githubToken);
  }

  return url;
}
