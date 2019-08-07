import { REPOS_CONTENTS_TREE_STORAGE_KEY, getBranches, getContents, getRepositories } from '../lib/github';

async function getFullFileList() {
  const fileListString = sessionStorage.getItem(REPOS_CONTENTS_TREE_STORAGE_KEY);
  const repositories = getRepositories();

  if (fileListString) {
    return JSON.parse(fileListString);
  }

  const fileList = [];

  let pwd = '/';

  repositories.forEach(async function (repo) {
    // const branches = await getBranches(repo);
    // branches.forEach(async function (branch) {
    //   const contents = await getContents(repo, pwd, branch);
    //   contents.forEach(async function (content) {
    //     if (contents.type === 'dir') {

    //     }
    //   });
    // });
  });
}