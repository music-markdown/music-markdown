const REPO_LIST_KEY = 'repoList';

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
export function getRepoList() {
  const repoListStr = localStorage.getItem(REPO_LIST_KEY);
  if (repoListStr) {
    return deserializeRepoList(repoListStr);
  } else {
    return undefined;
  }
}

/**
 * Adds a desired Github repo to localStorage
 * @param {A} owner Repo owner
 * @param {*} repo Repo name
 * @param {*} path Subdirectory
 */
export function addToRepoList(owner, repo, path) {
  const repoMap = {
    'owner': owner,
    'repo': repo,
    'path': path
  };
  const repoList = getRepoList();
  if (repoList === undefined) {
    localStorage.setItem(REPO_LIST_KEY, JSON.stringify(repoMap));
  } else {
    repoList.push(repoMap);
    localStorage.setItem(REPO_LIST_KEY, serializeRepoList(repoList));
  }
}

/* Takes an array of repo maps and serializes it into a string */
// TODO: URLs need to be sanitized
function serializeRepoList(repoList) {
  let serializedStr = '';
  repoList.forEach(function(repo) {
    const stringifiedMap = JSON.stringify(repo);
    if (serializedStr.length === 0) {
      serializedStr = stringifiedMap;
    } else {
      serializedStr = serializedStr.concat(';', stringifiedMap);
    }
  });
  return serializedStr;
}

/* Takes a string representation of an array of maps and returns it as an array */
function deserializeRepoList(stringifiedRepoList) {
  const repoListArr = [];
  const mapStrArr = stringifiedRepoList.split(';');
  mapStrArr.forEach(function(strMap) {
    repoListArr.push(JSON.parse(strMap));
  });
  return repoListArr;
}
