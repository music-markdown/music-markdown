import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import BranchViewer from ".";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import { ThemeProvider } from "../../context/ThemeProvider";
import { REPO_REGEX } from "../../lib/constants";

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
      ])
    );

    render(
      <GitHubApiProvider>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/repos/o/r"]}>
            <Route path={REPO_REGEX} exact component={BranchViewer} />
          </MemoryRouter>
        </ThemeProvider>
      </GitHubApiProvider>
    );

    expect(await screen.findByText("main")).toBeInTheDocument();
    expect(await screen.findByText("branch-1")).toBeInTheDocument();
    expect(await screen.findByText("branch-2")).toBeInTheDocument();
  });
});
