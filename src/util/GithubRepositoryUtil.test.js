import { GITHUB_TOKEN_LOCAL_STORAGE_KEY } from './Constants';
import { getContents, getRepositories, addRepository, getApiUrl } from './GithubRepositoryUtil';

describe('GitHub API', () => {
  afterEach(() => {
    localStorage.clear();
  });

  // TODO: Mock out the network call to GitHub API
  test('getContents fetches contents', async () => {
    const contents = await getContents('music-markdown', 'almost-in-time', '/');
    expect(contents.length).toBeGreaterThanOrEqual(1);
  });

  test('getRepositories contains new repo when repo is added to localStorage', () => {
    addRepository('music-markdown', 'almost-in-time', '/');
    const actualRepos = getRepositories();
    const expectedRepo = {
      'owner': 'music-markdown',
      'repo': 'almost-in-time',
      'path': '/'
    };
    expect(actualRepos).toContainEqual(expectedRepo);
  });

  test('getApiUrl returns API url with access token when localStorage contains github token', () => {
    localStorage.setItem(GITHUB_TOKEN_LOCAL_STORAGE_KEY, 'music-markdown-github-token');
    const actualUrl = getApiUrl('/some/path');
    expect(actualUrl.searchParams.get('access_token')).toEqual('music-markdown-github-token');
  });
});
