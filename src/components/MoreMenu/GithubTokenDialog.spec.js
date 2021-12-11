import { fireEvent, render } from "@testing-library/react";

import GithubTokenDialog from "./GithubTokenDialog";
import { GlobalStateProvider } from "../GlobalState";

describe("GithubTokenDialog", () => {
  const mockHandleClose = jest.fn();

  it("renders the dialog box", () => {
    const { queryByText } = render(
      <GlobalStateProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GlobalStateProvider>
    );

    expect(queryByText("Set GitHub Token")).toBeInTheDocument();
  });

  it("closes when cancel is clicked", () => {
    const { queryByText } = render(
      <GlobalStateProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GlobalStateProvider>
    );

    fireEvent.click(queryByText("Cancel"));
    expect(mockHandleClose).toBeCalled();
  });

  it("save is disabled when token is invalid", () => {
    const { getByLabelText, getByText } = render(
      <GlobalStateProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GlobalStateProvider>
    );

    fireEvent.change(getByLabelText("GitHub Token"), {
      target: { value: "invalid" },
    });
    expect(getByText("Save")).toBeDisabled();
  });

  it("closes when token is valid and save is clicked", async () => {
    const { getByLabelText, getByText } = render(
      <GlobalStateProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GlobalStateProvider>
    );

    fireEvent.change(getByLabelText("GitHub Token"), {
      target: { value: "ghp_abcdefghijklmnopqrstuvwxyzABCDEFGHIJ" },
    });
    expect(getByText("Save")).toBeEnabled();

    fireEvent.click(getByText("Save"));
    expect(mockHandleClose).toBeCalled();
  });

  it("shows clear when token is empty and closes after click", async () => {
    const { getByLabelText, getByText } = render(
      <GlobalStateProvider>
        <GithubTokenDialog open={true} handleClose={mockHandleClose} />
      </GlobalStateProvider>
    );

    fireEvent.change(getByLabelText("GitHub Token"), {
      target: { value: "" },
    });
    expect(getByText("Clear")).toBeEnabled();

    fireEvent.click(getByText("Clear"));
    expect(mockHandleClose).toBeCalled();
  });
});
