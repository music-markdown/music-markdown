import { Base64 } from "js-base64";
import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { gitHubApiFetch, isValidGithubToken } from "./github";

const fetch = createFetchMock(vi);
fetch.enableMocks();

describe("GitHub API", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  test("isValidGithubToken returns true on valid legacy token", () => {
    const token = "ff34885a8624460a855540c6592698d2f1812843";
    expect(isValidGithubToken(token)).toEqual(true);
  });

  test("isValidGithubToken returns true on valid token (classic)", () => {
    const token = "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";
    expect(isValidGithubToken(token)).toEqual(true);
  });

  test("isValidGithubToken returns true on valid fine-grained token", () => {
    const token = "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;
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

  // TODO: Write tests for getContents

  test("gitHubApiFetch attaches token when it is provided", async () => {
    const expectedToken = "music-markdown-github-token";
    const content = { content: Base64.encode("# California Dreamin'") };
    fetch.mockResponse(JSON.stringify(content));
    await gitHubApiFetch("/some/path", { gitHubToken: expectedToken });
    const request = fetch.mock.calls[0][0] as Request;
    expect(request.headers.get("Authorization")).toContain(expectedToken);
  });
});
