import {
  addRepository,
  deleteRepository,
  getContents,
  getGithubToken,
  getRepositories,
  isValidGithubToken,
  refreshIndexedContents,
  setGithubToken,
} from "./github";
import {
  mockGetBranchesResponse,
  mockMasterGetContentsResponse,
  mockSubdirectoryContentsTestResponse,
  mockSubdirectoryTestResponse,
  mockVinceTestGetContentsResponse,
} from "./MockGithubResponses";
import { Base64 } from "js-base64";
import { LOCAL_STORAGE_NAMESPACE } from "./constants";

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

  test("addRepository throws error when repo does not exist", () => {
    fetch.mockResponse(JSON.stringify({}), { status: 404 });
    expect(addRepository("some-repo/that-doesnt-exist")).rejects.toThrow();
  });

  test("addRepository throws error when repo is already registered", async () => {
    fetch.mockResponse(JSON.stringify({}));
    await addRepository("valid-owner/valid-repo");
    expect(addRepository("valid-owner/valid-repo")).rejects.toThrow();
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

  test("isValidGithubToken returns true on valid token", () => {
    const token = "ff34885a8624460a855540c6592698d2f1812843";
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

  test("isValidGithubToken returns false when token is less than 40 chars long", () => {
    const token = "ff34885a8624460a855540c6592698d2f181284";
    expect(isValidGithubToken(token)).toEqual(false);
  });

  test("isValidGithubToken returns false when token is more than 40 chars long", () => {
    const token = "ff34885a8624460a855540c6592698d2f18128433";
    expect(isValidGithubToken(token)).toEqual(false);
  });

  test("isValidGithubToken returns false when token contains non hex char", () => {
    const token = "ff34885a8624460a855540c6592698d2f181284g";
    expect(isValidGithubToken(token)).toEqual(false);
  });

  test("refreshIndexedContents returns correct contents", async () => {
    fetch.mockResponses(
      [JSON.stringify({})],
      [JSON.stringify(mockGetBranchesResponse)],
      [JSON.stringify(mockMasterGetContentsResponse)],
      [JSON.stringify(mockVinceTestGetContentsResponse)],
      [JSON.stringify(mockSubdirectoryTestResponse)],
      [JSON.stringify(mockSubdirectoryContentsTestResponse)]
    );

    await addRepository("music-markdown/almost-in-time");
    await refreshIndexedContents();
    const indexedContents = localStorage.getItem(
      `${LOCAL_STORAGE_NAMESPACE}:indexed-contents`
    );
    const expectedArr = [];
    expectedArr.push(
      "music-markdown/almost-in-time/master/A Bar in Amsterdam - Katzenjammer.md"
    );
    expectedArr.push(
      "music-markdown/almost-in-time/vince-test/A Thousand Years - Christina Perri.md"
    );
    expectedArr.push(
      "music-markdown/almost-in-time/subdirectory-test/The Mamas and the Papas/California Dreamin' - The Mamas and the Papas.md"
    );
    expect(indexedContents).toEqual(expectedArr.toString());
  });

  // TODO: Write tests for getBranches
  // TODO: Write tests for getContents
});
