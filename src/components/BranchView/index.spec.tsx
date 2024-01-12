import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import BranchViewer from ".";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import { ThemeProvider } from "../../context/ThemeProvider";
import { REPO_REGEX } from "../../lib/constants";

const fetch = createFetchMock(vi);
fetch.enableMocks();

describe("BranchViewer", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  it("renders expected branches", async () => {
    fetch.mockResponse(
      JSON.stringify([
        { name: "main" },
        { name: "branch-1" },
        { name: "branch-2" },
      ]),
    );

    render(
      <GitHubApiProvider>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/repos/o/r"]}>
            <Route exact path={REPO_REGEX}>
              <BranchViewer />
            </Route>
          </MemoryRouter>
        </ThemeProvider>
      </GitHubApiProvider>,
    );

    expect(await screen.findByText("main")).toBeInTheDocument();
    expect(await screen.findByText("branch-1")).toBeInTheDocument();
    expect(await screen.findByText("branch-2")).toBeInTheDocument();
  });
});
