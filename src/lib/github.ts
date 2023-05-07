import { Base64 } from "js-base64";

const GITHUB_API_URL = "https://api.github.com";

interface GitHubFile {
  message: string;
  content: string;
  branch: string;
  sha?: string;
}

export async function putContents(
  repo: string,
  path: string,
  content: string,
  sha: string | null,
  branch: string,
  gitHubToken: string
) {
  const body: GitHubFile = {
    message: `Music Markdown published ${path}`,
    content: Base64.encode(content),
    branch,
  };

  if (sha) {
    body.sha = sha;
  }

  return gitHubApiFetch(`/repos/${repo}/contents/${path}`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(body),
    gitHubToken,
  });
}

export interface RepoMetadata {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: string;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  temp_clone_token: string;
  organization: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  network_count: number;
  subscribers_count: number;
}

/**
 * Returns the list of repo names and corresponding GitHub metadata.
 */
export async function getRepoMetadata(
  repos: string[],
  { gitHubToken }: Options
): Promise<RepoMetadata[]> {
  return Promise.all(
    repos.map(async (repo) =>
      (await gitHubApiFetch(`/repos/${repo}`, { gitHubToken })).json()
    )
  );
}

export async function verifyRepoExists(repo: string, { gitHubToken }: Options) {
  const response = await gitHubApiFetch(`/repos/${repo}`, { gitHubToken });
  if (response.status === 404) {
    throw new Error(`"${repo}" not found on GitHub.`);
  }
}

export function isValidGithubToken(gitHubToken: string | null) {
  return (
    !!gitHubToken &&
    (!!gitHubToken.match(/^[0-9a-f]{40}$/) ||
      !!gitHubToken.match(/^ghp_[a-zA-Z0-9]{36}$/))
  );
}

interface Options extends RequestInit {
  gitHubToken?: string;
}

/**
 * Performs a fetch to the GitHub API.
 */
export async function gitHubApiFetch(
  path: string,
  { gitHubToken, ...init }: Options
) {
  const input = new URL(path, GITHUB_API_URL);

  if (gitHubToken) {
    init = {
      ...init,
      ...{ headers: { Authorization: `token ${gitHubToken}` } },
    };
  }

  return fetch(new Request(input, init));
}
