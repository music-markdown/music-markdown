import { addRepository, deleteRepository, getApiUrl, getRepositories, refreshIndexedContents } from './github';
import {
  mockGetBranchesResponse,
  mockMasterGetContentsResponse,
  mockSubdirectoryTestResponse,
  mockVinceTestGetContentsResponse
} from './MockGithubResponses';

import { WINDOW_STORAGE_NAMESPACE } from './constants';

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
    localStorage.setItem('music-markdown:github_token', 'music-markdown-github-token');
    const actualUrl = getApiUrl('/some/path');
    expect(actualUrl.searchParams.get('access_token')).toEqual('music-markdown-github-token');
  });

  test('refreshIndexedContents returns correct contents', async () => {
    fetch.mockResponses(
      [JSON.stringify({})],
      [JSON.stringify(mockGetBranchesResponse)],
      [JSON.stringify(mockMasterGetContentsResponse)],
      [JSON.stringify(mockVinceTestGetContentsResponse)],
      [JSON.stringify(mockSubdirectoryTestResponse)]
    );

    await addRepository('music-markdown/almost-in-time');
    await refreshIndexedContents();
    const indexedContents = localStorage.getItem(`${WINDOW_STORAGE_NAMESPACE}:indexed-contents`);
    const expectedArr = [];
    expectedArr.push('music-markdown/almost-in-time/master/A Bar in Amsterdam - Katzenjammer.md');
    expectedArr.push('music-markdown/almost-in-time/subdirectory-test/A Thousand Years - Christina Perri.md');
    expectedArr.push('music-markdown/almost-in-time/vince-test/Always Remember Us This Way - Lady Gaga .md');
    expect(indexedContents).toEqual(expectedArr.toString());
  });
});
