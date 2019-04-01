import { addRepository, deleteRepository, getApiUrl, getRepositories } from './github';
import { GITHUB_TOKEN_LOCAL_STORAGE_KEY } from './constants';

describe('GitHub API', () => {
  afterEach(() => {
    fetch.resetMocks();
    localStorage.clear();
  });

  test('getRepositories contains new repo when repo is added with addRepository', async () => {
    fetch.mockResponse(JSON.stringify({}));
    await addRepository('music-markdown/almost-in-time');
    const actualRepos = getRepositories();
    const expectedRepo = 'music-markdown/almost-in-time';
    expect(actualRepos).toContainEqual(expectedRepo);
  });

  test('addRepository throws error when repo does not exist', () => {
    fetch.mockResponse(JSON.stringify({}), { status: 404 });
    expect(addRepository('some-repo/that-doesnt-exist')).rejects.toThrow();
  });

  test('addRepository throws error when repo is already registered', async () => {
    fetch.mockResponse(JSON.stringify({}));
    await addRepository('valid-owner/valid-repo');
    expect(addRepository('valid-owner/valid-repo')).rejects.toThrow();
  });

  test('deleteRepository removes the correct', async () => {
    fetch.mockResponse(JSON.stringify({}));
    await addRepository('valid-owner/valid-repo-1');
    await addRepository('valid-owner/valid-repo-2');
    deleteRepository('valid-owner/valid-repo-1');
    const actualRepos = getRepositories();
    expect(actualRepos).toEqual(['valid-owner/valid-repo-2']);
  });

  test('getApiUrl returns API url with access token when localStorage contains github token', () => {
    localStorage.setItem(GITHUB_TOKEN_LOCAL_STORAGE_KEY, 'music-markdown-github-token');
    const actualUrl = getApiUrl('/some/path');
    expect(actualUrl.searchParams.get('access_token')).toEqual('music-markdown-github-token');
  });

  // TODO: Write tests for getBranches
  // TODO: Write tests for getContents
});
