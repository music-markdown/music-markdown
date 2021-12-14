import { fireEvent, render } from "@testing-library/react";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import GithubTokenDialog from "./GithubTokenDialog";

describe("GithubTokenDialog", () => {
  const mockHandleClose = jest.fn();

  it("renders the dialog box", () => {
    const { queryByText } = render(
      <GitHubApiProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GitHubApiProvider>
    );

    expect(queryByText("Set GitHub Token")).toBeInTheDocument();
  });

  it("closes when cancel is clicked without modifying token", () => {
    const { getByLabelText, queryByText } = render(
      <GitHubApiProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GitHubApiProvider>
    );
    localStorage.setItem(
      "gitHubToken",
      JSON.stringify("ghp_abcdefghijklmnopqrstuvwxyzABCDEFGHIJ")
    );

    fireEvent.change(getByLabelText("GitHub Token"), {
      target: { value: "ghp_abcdefghijklmnopqrstuvwxyz1234567890" },
    });
    fireEvent.click(queryByText("Cancel"));
    expect(mockHandleClose).toBeCalled();
    expect(JSON.parse(localStorage.getItem("gitHubToken"))).toEqual(
      "ghp_abcdefghijklmnopqrstuvwxyzABCDEFGHIJ"
    );
  });

  it("save is disabled when token is invalid", () => {
    const { getByLabelText, getByText } = render(
      <GitHubApiProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GitHubApiProvider>
    );

    fireEvent.change(getByLabelText("GitHub Token"), {
      target: { value: "invalid" },
    });
    expect(getByText("Save")).toBeDisabled();
  });

  it("saves token when token is valid and save is clicked", async () => {
    const { getByLabelText, getByText } = render(
      <GitHubApiProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GitHubApiProvider>
    );

    fireEvent.change(getByLabelText("GitHub Token"), {
      target: { value: "ghp_abcdefghijklmnopqrstuvwxyzABCDEFGHIJ" },
    });
    expect(getByText("Save")).toBeEnabled();

    fireEvent.click(getByText("Save"));
    expect(mockHandleClose).toBeCalled();
    expect(JSON.parse(localStorage.getItem("gitHubToken"))).toEqual(
      "ghp_abcdefghijklmnopqrstuvwxyzABCDEFGHIJ"
    );
  });

  it("clears token when token is empty and clear is clicked", async () => {
    const { getByLabelText, getByText } = render(
      <GitHubApiProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GitHubApiProvider>
    );
    localStorage.setItem(
      "gitHubToken",
      JSON.stringify("ghp_abcdefghijklmnopqrstuvwxyzABCDEFGHIJ")
    );

    fireEvent.change(getByLabelText("GitHub Token"), {
      target: { value: "" },
    });
    expect(getByText("Clear")).toBeEnabled();

    fireEvent.click(getByText("Clear"));
    expect(mockHandleClose).toBeCalled();
    expect(localStorage.getItem("gitHubToken")).toBeNull();
  });
});
