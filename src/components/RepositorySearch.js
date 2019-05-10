import { MUSIC_MARKDOWN_LOCAL_STORAGE_FILELIST_KEY } from '../lib/constants';

import { getBranches, getContents, getRepositories } from '../lib/github';

async function getFullFileList() {
  const fileListString = localStorage.getItem(MUSIC_MARKDOWN_LOCAL_STORAGE_FILELIST_KEY);
  const repositories = getRepositories();

  if (fileListString) {
    return JSON.parse(fileListString);
  }

  const fileList = [];

  let pwd = '/';

  repositories.forEach(async function(repo) {
    const branches = await getBranches(repo);
    branches.forEach(async function(branch) {
      const contents = await getContents(repo, pwd, branch);
      contents.forEach(async function(content) {
        if (contents.type === 'dir') {
          
        }
      });
    });
  });
}
