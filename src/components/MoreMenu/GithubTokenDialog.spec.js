import { fireEvent, render, screen } from "@testing-library/react";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import GithubTokenDialog from "./GithubTokenDialog";

describe("GithubTokenDialog", () => {
  const mockHandleClose = jest.fn();

  it("renders the dialog box", () => {
    render(
      <GitHubApiProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GitHubApiProvider>
    );

    expect(screen.getByText("Set GitHub Token")).toBeInTheDocument();
  });

  it("closes when cancel is clicked without modifying token", () => {
    render(
      <GitHubApiProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GitHubApiProvider>
    );
    localStorage.setItem(
      "gitHubToken",
      JSON.stringify("ghp_abcdefghijklmnopqrstuvwxyzABCDEFGHIJ")
    );

    fireEvent.change(screen.getByLabelText("GitHub Token"), {
      target: { value: "ghp_abcdefghijklmnopqrstuvwxyz1234567890" },
    });
    fireEvent.click(screen.queryByText("Cancel"));
    expect(mockHandleClose).toBeCalled();
    expect(JSON.parse(localStorage.getItem("gitHubToken"))).toEqual(
      "ghp_abcdefghijklmnopqrstuvwxyzABCDEFGHIJ"
    );
  });

  it("save is disabled when token is invalid", () => {
    render(
      <GitHubApiProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GitHubApiProvider>
    );

    fireEvent.change(screen.getByLabelText("GitHub Token"), {
      target: { value: "invalid" },
    });
    expect(screen.getByText("Save")).toBeDisabled();
  });

  it("saves token when token is valid and save is clicked", async () => {
    render(
      <GitHubApiProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GitHubApiProvider>
    );

    fireEvent.change(screen.getByLabelText("GitHub Token"), {
      target: { value: "ghp_abcdefghijklmnopqrstuvwxyzABCDEFGHIJ" },
    });
    expect(screen.getByText("Save")).toBeEnabled();

    fireEvent.click(screen.getByText("Save"));
    expect(mockHandleClose).toBeCalled();
    expect(JSON.parse(localStorage.getItem("gitHubToken"))).toEqual(
      "ghp_abcdefghijklmnopqrstuvwxyzABCDEFGHIJ"
    );
  });

  it("clears token when token is empty and clear is clicked", async () => {
    render(
      <GitHubApiProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GitHubApiProvider>
    );
    localStorage.setItem(
      "gitHubToken",
      JSON.stringify("ghp_abcdefghijklmnopqrstuvwxyzABCDEFGHIJ")
    );

    fireEvent.change(screen.getByLabelText("GitHub Token"), {
      target: { value: "" },
    });
    expect(screen.getByText("Clear")).toBeEnabled();

    fireEvent.click(screen.getByText("Clear"));
    expect(mockHandleClose).toBeCalled();
    expect(localStorage.getItem("gitHubToken")).toBeNull();
  });
});
