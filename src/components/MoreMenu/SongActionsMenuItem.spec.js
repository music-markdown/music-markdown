/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import SnackbarProvider from "../../context/SnackbarProvider";
import { REPO_REGEX } from "../../lib/constants";
import SongActionsMenuItem from "./SongActionsMenuItem";

describe("SongActionsMenuItem", () => {
  it("renders edit button when on viewer page", () => {
    const mockHandleClose = jest.fn();

    render(
      <SnackbarProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode/:branch/:path*`}
            render={() => <SongActionsMenuItem close={mockHandleClose} />}
          />
        </MemoryRouter>
      </SnackbarProvider>
    );

    expect(screen.getByText("Edit inline")).toBeInTheDocument();
  });

  it("renders exit button when on editor page", () => {
    const mockHandleClose = jest.fn();

    render(
      <SnackbarProvider>
        <MemoryRouter initialEntries={["/repos/o/r/editor/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode/:branch/:path*`}
            render={() => <SongActionsMenuItem close={mockHandleClose} />}
          />
        </MemoryRouter>
      </SnackbarProvider>
    );

    expect(screen.getByText("Exit to viewer")).toBeInTheDocument();
  });

  it("copies song url when share is clicked", async () => {
    const mockHandleClose = jest.fn();

    render(
      <SnackbarProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode/:branch/:path*`}
            render={() => <SongActionsMenuItem close={mockHandleClose} />}
          />
        </MemoryRouter>
      </SnackbarProvider>
    );

    fireEvent.click(screen.getByText("Share song"));
    expect(screen.getByText("Song QR Code")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Close"));
    expect(mockHandleClose).toBeCalled();
  });
});
