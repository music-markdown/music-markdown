export const mockGetBranchesResponse = [
  {
    'name': 'master',
    'commit': {
      'sha': 'c73c201351e208562507f09335e54660e77b2b10',
      'url': 'https://api.github.com/repos/music-markdown/almost-in-time/commits/c73c201351e208562507f09335e54660e77b2b10'
    },
    'protected': false,
    'protection': {
      'enabled': false,
      'required_status_checks': {
        'enforcement_level': 'off',
        'contexts': [

        ]
      }
    },
    'protection_url': 'https://api.github.com/repos/music-markdown/almost-in-time/branches/master/protection'
  },
  {
    'name': 'subdirectory-test',
    'commit': {
      'sha': '753feb0669eab45158d717c33efb87c98d0979c7',
      'url': 'https://api.github.com/repos/music-markdown/almost-in-time/commits/753feb0669eab45158d717c33efb87c98d0979c7'
    },
    'protected': false,
    'protection': {
      'enabled': false,
      'required_status_checks': {
        'enforcement_level': 'off',
        'contexts': [

        ]
      }
    },
    'protection_url': 'https://api.github.com/repos/music-markdown/almost-in-time/branches/subdirectory-test/protection'
  },
  {
    'name': 'vince-test',
    'commit': {
      'sha': '30600268d238dc5c0eddbe36a29c148cf0589b8e',
      'url': 'https://api.github.com/repos/music-markdown/almost-in-time/commits/30600268d238dc5c0eddbe36a29c148cf0589b8e'
    },
    'protected': false,
    'protection': {
      'enabled': false,
      'required_status_checks': {
        'enforcement_level': 'off',
        'contexts': [

        ]
      }
    },
    'protection_url': 'https://api.github.com/repos/music-markdown/almost-in-time/branches/vince-test/protection'
  }
];

export const mockMasterGetContentsResponse = [
  {
    'name': 'A Bar in Amsterdam - Katzenjammer.md',
    'path': 'A Bar in Amsterdam - Katzenjammer.md',
    'sha': '6d0c20317cef6b327cd2c529770267c5d05d9f57',
    'size': 3926,
    'url': 'https://api.github.com/repos/music-markdown/almost-in-time/contents/A%20Bar%20in%20Amsterdam%20-%20Katzenjammer.md?ref=master',
    'html_url': 'https://github.com/music-markdown/almost-in-time/blob/master/A%20Bar%20in%20Amsterdam%20-%20Katzenjammer.md',
    'git_url': 'https://api.github.com/repos/music-markdown/almost-in-time/git/blobs/6d0c20317cef6b327cd2c529770267c5d05d9f57',
    'download_url': 'https://raw.githubusercontent.com/music-markdown/almost-in-time/master/A%20Bar%20in%20Amsterdam%20-%20Katzenjammer.md',
    'type': 'file',
    '_links': {
      'self': 'https://api.github.com/repos/music-markdown/almost-in-time/contents/A%20Bar%20in%20Amsterdam%20-%20Katzenjammer.md?ref=master',
      'git': 'https://api.github.com/repos/music-markdown/almost-in-time/git/blobs/6d0c20317cef6b327cd2c529770267c5d05d9f57',
      'html': 'https://github.com/music-markdown/almost-in-time/blob/master/A%20Bar%20in%20Amsterdam%20-%20Katzenjammer.md'
    }
  }
];

export const mockVinceTestGetContentsResponse = [
  {
    'name': 'A Thousand Years - Christina Perri.md',
    'path': 'A Thousand Years - Christina Perri.md',
    'sha': 'd36300a9e4a531673092589235245a8a45314b0d',
    'size': 2517,
    'url': 'https://api.github.com/repos/music-markdown/almost-in-time/contents/A%20Thousand%20Years%20-%20Christina%20Perri.md?ref=master',
    'html_url': 'https://github.com/music-markdown/almost-in-time/blob/master/A%20Thousand%20Years%20-%20Christina%20Perri.md',
    'git_url': 'https://api.github.com/repos/music-markdown/almost-in-time/git/blobs/d36300a9e4a531673092589235245a8a45314b0d',
    'download_url': 'https://raw.githubusercontent.com/music-markdown/almost-in-time/master/A%20Thousand%20Years%20-%20Christina%20Perri.md',
    'type': 'file',
    '_links': {
      'self': 'https://api.github.com/repos/music-markdown/almost-in-time/contents/A%20Thousand%20Years%20-%20Christina%20Perri.md?ref=master',
      'git': 'https://api.github.com/repos/music-markdown/almost-in-time/git/blobs/d36300a9e4a531673092589235245a8a45314b0d',
      'html': 'https://github.com/music-markdown/almost-in-time/blob/master/A%20Thousand%20Years%20-%20Christina%20Perri.md'
    }
  }
];

export const mockSubdirectoryTestResponse = [
  {
    'name': 'Always Remember Us This Way - Lady Gaga .md',
    'path': 'Always Remember Us This Way - Lady Gaga .md',
    'sha': '019564a84ddb2691b83263d33b0ac2ba7340701a',
    'size': 376,
    'url': 'https://api.github.com/repos/music-markdown/almost-in-time/contents/Always%20Remember%20Us%20This%20Way%20-%20Lady%20Gaga%20.md?ref=master',
    'html_url': 'https://github.com/music-markdown/almost-in-time/blob/master/Always%20Remember%20Us%20This%20Way%20-%20Lady%20Gaga%20.md',
    'git_url': 'https://api.github.com/repos/music-markdown/almost-in-time/git/blobs/019564a84ddb2691b83263d33b0ac2ba7340701a',
    'download_url': 'https://raw.githubusercontent.com/music-markdown/almost-in-time/master/Always%20Remember%20Us%20This%20Way%20-%20Lady%20Gaga%20.md',
    'type': 'file',
    '_links': {
      'self': 'https://api.github.com/repos/music-markdown/almost-in-time/contents/Always%20Remember%20Us%20This%20Way%20-%20Lady%20Gaga%20.md?ref=master',
      'git': 'https://api.github.com/repos/music-markdown/almost-in-time/git/blobs/019564a84ddb2691b83263d33b0ac2ba7340701a',
      'html': 'https://github.com/music-markdown/almost-in-time/blob/master/Always%20Remember%20Us%20This%20Way%20-%20Lady%20Gaga%20.md'
    }
  }
];
