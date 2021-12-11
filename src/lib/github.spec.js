import {
  addRepository,
  deleteRepository,
  getContents,
  getGithubToken,
  getRepositories,
  isValidGithubToken,
  setGithubToken,
} from "./github";

import { Base64 } from "js-base64";

describe("GitHub API", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  test("getRepositories contains new repo when repo is added with addRepository", async () => {
    fetch.mockResponse(JSON.stringify({}));
    await addRepository("music-markdown/almost-in-time");
    const actualRepos = getRepositories();
    const expectedRepo = "music-markdown/almost-in-time";
    expect(actualRepos).toContainEqual(expectedRepo);
  });

  test("addRepository throws error when repo does not exist", async () => {
    fetch.mockResponse(JSON.stringify({}), { status: 404 });
    await expect(addRepository("a-repo/that-doesnt-exist")).rejects.toThrow();
  });

  test("addRepository throws error when repo is already registered", async () => {
    fetch.mockResponse(JSON.stringify({}));
    await addRepository("valid-owner/valid-repo");
    await expect(addRepository("valid-owner/valid-repo")).rejects.toThrow();
  });

  test("deleteRepository removes the correct", async () => {
    fetch.mockResponse(JSON.stringify({}));
    await addRepository("valid-owner/valid-repo-1");
    await addRepository("valid-owner/valid-repo-2");
    deleteRepository("valid-owner/valid-repo-1");
    const actualRepos = getRepositories();
    expect(actualRepos).toEqual(["valid-owner/valid-repo-2"]);
  });

  test("getContents decodes markdown files from base64", async () => {
    const content = { content: Base64.encode("# California Dreamin'") };
    fetch.mockResponse(JSON.stringify(content));
    const response = await getContents("repo", "file.md", "master");
    expect(response.content).toEqual("# California Dreamin'");
  });

  test("getContents fetch contains GitHub token when it is available", async () => {
    const expectedToken = "music-markdown-github-token";
    setGithubToken("music-markdown-github-token");
    const content = { content: Base64.encode("# California Dreamin'") };
    fetch.mockResponse(JSON.stringify(content));
    await getContents("repo", "file.md", "master");
    const request = fetch.mock.calls[0][0];
    expect(request.headers.get("Authorization")).toContain(expectedToken);
  });

  test("getGithubToken returns token from localStorage", () => {
    const expectedToken = "music-markdown-github-token";
    localStorage.setItem("music-markdown:github_token", expectedToken);
    const actualToken = getGithubToken();
    expect(actualToken).toEqual(expectedToken);
  });

  test("getGithubToken returns null when token is not set", () => {
    const expectedToken = null;
    const actualToken = getGithubToken();
    expect(actualToken).toEqual(expectedToken);
  });

  test("setGithubToken saves the token to localStorage", () => {
    const expectedToken = "music-markdown-github-token";
    setGithubToken(expectedToken);
    const actualToken = localStorage.getItem("music-markdown:github_token");
    expect(actualToken).toEqual(expectedToken);
  });

  test("setGithubToken with empty string clears the token from localStorage", () => {
    setGithubToken("");
    const actualToken = localStorage.getItem("music-markdown:github_token");
    expect(actualToken).toEqual(null);
  });

  test("isValidGithubToken returns true on valid legacy token", () => {
    const token = "ff34885a8624460a855540c6592698d2f1812843";
    expect(isValidGithubToken(token)).toEqual(true);
  });

  test("isValidGithubToken returns true on valid token", () => {
    const token = "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";
    expect(isValidGithubToken(token)).toEqual(true);
  });

  test("isValidGithubToken returns false when token is null", () => {
    const token = null;
    expect(isValidGithubToken(token)).toEqual(false);
  });

  test("isValidGithubToken returns false when token is empty", () => {
    const token = "";
    expect(isValidGithubToken(token)).toEqual(false);
  });

  test("isValidGithubToken returns false when legacy token is less than 40 chars long", () => {
    const token = "ff34885a8624460a855540c6592698d2f181284";
    expect(isValidGithubToken(token)).toEqual(false);
  });

  test("isValidGithubToken returns false when token is less than 36 chars long", () => {
    const token = "ghp_wmggJcNUP5a4k9bPLvHYp5e5lZ4Dt92TmhC";
    expect(isValidGithubToken(token)).toEqual(false);
  });

  test("isValidGithubToken returns false when legacy token is more than 40 chars long", () => {
    const token = "ff34885a8624460a855540c6592698d2f18128433";
    expect(isValidGithubToken(token)).toEqual(false);
  });

  test("isValidGithubToken returns false when token is more than 40 chars long", () => {
    const token = "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a";
    expect(isValidGithubToken(token)).toEqual(false);
  });

  test("isValidGithubToken returns false when legacy token contains non hex char", () => {
    const token = "ff34885a8624460a855540c6592698d2f181284g";
    expect(isValidGithubToken(token)).toEqual(false);
  });

  test("isValidGithubToken returns false when token contains non base64 char", () => {
    const token = "ghp_wmggJcNUP5a4k9bPLvHYp5e5lZ4Dt92TmhC-";
    expect(isValidGithubToken(token)).toEqual(false);
  });

  test("isValidGithubToken returns false when token is not prefixed with ghp_", () => {
    const token = "gha_wmggJcNUP5a4k9bPLvHYp5e5lZ4Dt92TmhCL";
    expect(isValidGithubToken(token)).toEqual(false);
  });

  // TODO: Write tests for getBranches
  // TODO: Write tests for getContents
});
