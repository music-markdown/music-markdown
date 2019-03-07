import { REPOS_LOCAL_STORAGE_KEY } from './Constants';
/**
 * Returns a Promise of the contents of a file or directory in a GitHub repository.
 * See https://developer.github.com/v3/repos/contents/#get-contents
 * @param {string} owner Account owner of the repo
 * @param {string} repo Repo name
 * @param {string} path The directory or file to retrieve
 * @return {Object} JSON dictionary of repository contents
 */
export async function getContents(owner, repo, path) {
  const normalizedUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const response = await fetch(normalizedUrl);
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
