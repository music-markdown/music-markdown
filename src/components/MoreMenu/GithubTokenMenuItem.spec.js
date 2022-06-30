import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import GithubTokenMenuItem from "./GithubTokenMenuItem";

describe("GithubTokenMenuItem", () => {
  it("shows GithubTokenDialog when Set GitHub Token is clicked", () => {
    render(
      <GitHubApiProvider>
        <GithubTokenMenuItem />
      </GitHubApiProvider>
    );

    fireEvent.click(screen.getByText("Set GitHub Token"));
    expect(screen.getByText("How to Create a New Token")).toBeInTheDocument();
  });

  it("closes GithubTokenDialog when cancel is clicked", async () => {
    render(
      <GitHubApiProvider>
        <GithubTokenMenuItem />
      </GitHubApiProvider>
    );

    fireEvent.click(screen.getByText("Set GitHub Token"));
    fireEvent.click(screen.getByText("Cancel"));
    await waitForElementToBeRemoved(screen.queryByText("Cancel"));
    expect(
      screen.queryByText("How to Create a New Token")
    ).not.toBeInTheDocument();
  });
});
