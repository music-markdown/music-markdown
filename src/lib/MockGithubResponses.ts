export const mockGetBranchesResponse = [
  {
    name: "master",
    commit: {
      sha: "c73c201351e208562507f09335e54660e77b2b10",
      url:
        "https://api.github.com/repos/music-markdown/almost-in-time/commits/c73c201351e208562507f09335e54660e77b2b10",
    },
    protected: false,
    protection: {
      enabled: false,
      required_status_checks: {
        enforcement_level: "off",
        contexts: [],
      },
    },
    protection_url:
      "https://api.github.com/repos/music-markdown/almost-in-time/branches/master/protection",
  },
  {
    name: "vince-test",
    commit: {
      sha: "30600268d238dc5c0eddbe36a29c148cf0589b8e",
      url:
        "https://api.github.com/repos/music-markdown/almost-in-time/commits/30600268d238dc5c0eddbe36a29c148cf0589b8e",
    },
    protected: false,
    protection: {
      enabled: false,
      required_status_checks: {
        enforcement_level: "off",
        contexts: [],
      },
    },
    protection_url:
      "https://api.github.com/repos/music-markdown/almost-in-time/branches/vince-test/protection",
  },
  {
    name: "subdirectory-test",
    commit: {
      sha: "753feb0669eab45158d717c33efb87c98d0979c7",
      url:
        "https://api.github.com/repos/music-markdown/almost-in-time/commits/753feb0669eab45158d717c33efb87c98d0979c7",
    },
    protected: false,
    protection: {
      enabled: false,
      required_status_checks: {
        enforcement_level: "off",
        contexts: [],
      },
    },
    protection_url:
      "https://api.github.com/repos/music-markdown/almost-in-time/branches/subdirectory-test/protection",
  },
];

export const mockMasterGetContentsResponse = [
  {
    name: "A Bar in Amsterdam - Katzenjammer.md",
    path: "A Bar in Amsterdam - Katzenjammer.md",
    sha: "6d0c20317cef6b327cd2c529770267c5d05d9f57",
    size: 3926,
    url:
      "https://api.github.com/repos/music-markdown/almost-in-time/contents/A%20Bar%20in%20Amsterdam%20-%20Katzenjammer.md?ref=master",
    html_url:
      "https://github.com/music-markdown/almost-in-time/blob/master/A%20Bar%20in%20Amsterdam%20-%20Katzenjammer.md",
    git_url:
      "https://api.github.com/repos/music-markdown/almost-in-time/git/blobs/6d0c20317cef6b327cd2c529770267c5d05d9f57",
    download_url:
      "https://raw.githubusercontent.com/music-markdown/almost-in-time/master/A%20Bar%20in%20Amsterdam%20-%20Katzenjammer.md",
    type: "file",
    _links: {
      self:
        "https://api.github.com/repos/music-markdown/almost-in-time/contents/A%20Bar%20in%20Amsterdam%20-%20Katzenjammer.md?ref=master",
      git:
        "https://api.github.com/repos/music-markdown/almost-in-time/git/blobs/6d0c20317cef6b327cd2c529770267c5d05d9f57",
      html:
        "https://github.com/music-markdown/almost-in-time/blob/master/A%20Bar%20in%20Amsterdam%20-%20Katzenjammer.md",
    },
  },
];

export const mockVinceTestGetContentsResponse = [
  {
    name: "A Thousand Years - Christina Perri.md",
    path: "A Thousand Years - Christina Perri.md",
    sha: "d36300a9e4a531673092589235245a8a45314b0d",
    size: 2517,
    url:
      "https://api.github.com/repos/music-markdown/almost-in-time/contents/A%20Thousand%20Years%20-%20Christina%20Perri.md?ref=master",
    html_url:
      "https://github.com/music-markdown/almost-in-time/blob/master/A%20Thousand%20Years%20-%20Christina%20Perri.md",
    git_url:
      "https://api.github.com/repos/music-markdown/almost-in-time/git/blobs/d36300a9e4a531673092589235245a8a45314b0d",
    download_url:
      "https://raw.githubusercontent.com/music-markdown/almost-in-time/master/A%20Thousand%20Years%20-%20Christina%20Perri.md",
    type: "file",
    _links: {
      self:
        "https://api.github.com/repos/music-markdown/almost-in-time/contents/A%20Thousand%20Years%20-%20Christina%20Perri.md?ref=master",
      git:
        "https://api.github.com/repos/music-markdown/almost-in-time/git/blobs/d36300a9e4a531673092589235245a8a45314b0d",
      html:
        "https://github.com/music-markdown/almost-in-time/blob/master/A%20Thousand%20Years%20-%20Christina%20Perri.md",
    },
  },
];

export const mockSubdirectoryTestResponse = [
  {
    name: "The Mamas and the Papas",
    path: "The Mamas and the Papas",
    sha: "1d793267f7a196c802bc2c26323c0569c8e1b663",
    size: 0,
    url:
      "https://api.github.com/repos/music-markdown/almost-in-time/contents/The%20Mamas%20and%20the%20Papas?ref=master",
    html_url:
      "https://github.com/music-markdown/almost-in-time/tree/master/The%20Mamas%20and%20the%20Papas",
    git_url:
      "https://api.github.com/repos/music-markdown/almost-in-time/git/trees/1d793267f7a196c802bc2c26323c0569c8e1b663",
    download_url: null,
    type: "dir",
    _links: {
      self:
        "https://api.github.com/repos/music-markdown/almost-in-time/contents/The%20Mamas%20and%20the%20Papas?ref=master",
      git:
        "https://api.github.com/repos/music-markdown/almost-in-time/git/trees/1d793267f7a196c802bc2c26323c0569c8e1b663",
      html:
        "https://github.com/music-markdown/almost-in-time/tree/master/The%20Mamas%20and%20the%20Papas",
    },
  },
];

export const mockSubdirectoryContentsTestResponse = [
  {
    name: "California Dreamin' - The Mamas and the Papas.md",
    path:
      "The Mamas and the Papas/California Dreamin' - The Mamas and the Papas.md",
    sha: "4f16169c046b572ece52539d019686369969bbc1",
    size: 2183,
    url:
      "https://api.github.com/repos/music-markdown/almost-in-time/contents/The%20Mamas%20and%20the%20Papas/California%20Dreamin'%20-%20The%20Mamas%20and%20the%20Papas.md?ref=master",
    html_url:
      "https://github.com/music-markdown/almost-in-time/blob/master/The%20Mamas%20and%20the%20Papas/California%20Dreamin'%20-%20The%20Mamas%20and%20the%20Papas.md",
    git_url:
      "https://api.github.com/repos/music-markdown/almost-in-time/git/blobs/4f16169c046b572ece52539d019686369969bbc1",
    download_url:
      "https://raw.githubusercontent.com/music-markdown/almost-in-time/master/The%20Mamas%20and%20the%20Papas/California%20Dreamin'%20-%20The%20Mamas%20and%20the%20Papas.md",
    type: "file",
    _links: {
      self:
        "https://api.github.com/repos/music-markdown/almost-in-time/contents/The%20Mamas%20and%20the%20Papas/California%20Dreamin'%20-%20The%20Mamas%20and%20the%20Papas.md?ref=master",
      git:
        "https://api.github.com/repos/music-markdown/almost-in-time/git/blobs/4f16169c046b572ece52539d019686369969bbc1",
      html:
        "https://github.com/music-markdown/almost-in-time/blob/master/The%20Mamas%20and%20the%20Papas/California%20Dreamin'%20-%20The%20Mamas%20and%20the%20Papas.md",
    },
  },
];

