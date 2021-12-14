import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import GithubTokenMenuItem from "./GithubTokenMenuItem";

describe("GithubTokenMenuItem", () => {
  it("shows GithubTokenDialog when Set GitHub Token is clicked", () => {
    const { getByText, queryByText } = render(
      <GitHubApiProvider>
        <GithubTokenMenuItem />
      </GitHubApiProvider>
    );

    fireEvent.click(getByText("Set GitHub Token"));
    expect(queryByText("How to Create a New Token")).toBeInTheDocument();
  });

  it("closes GithubTokenDialog when cancel is clicked", async () => {
    const { getByText, queryByText } = render(
      <GitHubApiProvider>
        <GithubTokenMenuItem />
      </GitHubApiProvider>
    );

    fireEvent.click(getByText("Set GitHub Token"));
    fireEvent.click(getByText("Cancel"));
    await waitForElementToBeRemoved(getByText("Cancel"));
    expect(queryByText("How to Create a New Token")).not.toBeInTheDocument();
  });
});
