/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import SnackbarProvider from "../../context/SnackbarProvider";
import { REPO_REGEX } from "../../lib/constants";
import SongActionsMenuItem from "./SongActionsMenuItem";

describe("SongActionsMenuItem", () => {
  beforeEach(() => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
  });

  it("renders edit button when on viewer page", () => {
    const mockHandleClose = jest.fn();

    const { queryByText } = render(
      <SnackbarProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode/:branch/:path*`}
            render={() => <SongActionsMenuItem close={mockHandleClose} />}
          />
        </MemoryRouter>
      </SnackbarProvider>
    );

    expect(queryByText("Edit inline")).toBeInTheDocument();
  });

  it("renders exit button when on editor page", () => {
    const mockHandleClose = jest.fn();

    const { queryByText } = render(
      <SnackbarProvider>
        <MemoryRouter initialEntries={["/repos/o/r/editor/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode/:branch/:path*`}
            render={() => <SongActionsMenuItem close={mockHandleClose} />}
          />
        </MemoryRouter>
      </SnackbarProvider>
    );

    expect(queryByText("Exit to viewer")).toBeInTheDocument();
  });

  it("copies song url when share is clicked", async () => {
    const mockHandleClose = jest.fn();

    const { getByText } = render(
      <SnackbarProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode/:branch/:path*`}
            render={() => <SongActionsMenuItem close={mockHandleClose} />}
          />
        </MemoryRouter>
      </SnackbarProvider>
    );

    fireEvent.click(getByText("Share song URL"));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "http://localhost/"
    );
  });
});
