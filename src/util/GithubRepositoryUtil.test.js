import { getContents, getRepositories, addRepository } from './GithubRepositoryUtil';

const owner = 'music-markdown';
const repo = 'almost-in-time';
const path = '/';

test(`getContents for known Github repository`, async () => {
  const contents = await getContents(owner, repo, path);
  expect(contents.length).toBeGreaterThanOrEqual(1);
});

test(`add repo to localStorage repoList then verify successfully added`, () => {
  localStorage.clear();
  addRepository(owner, repo, path);
  const repoList = getRepositories();
  const expectedMap = {
    'owner': owner,
    'repo': repo,
    'path': path
  };
  expect(repoList[0]).toEqual(expectedMap);
});
