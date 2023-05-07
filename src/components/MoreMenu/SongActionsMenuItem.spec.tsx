import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import { SnackbarProvider } from "../../context/SnackbarProvider";
import { REPO_REGEX } from "../../lib/constants";
import SongActionsMenuItem from "./SongActionsMenuItem";

describe("SongActionsMenuItem", () => {
  it("renders edit button when on viewer page", () => {
    const mockHandleClose = jest.fn();
    const mockOpenQrCodeDialog = jest.fn();

    render(
      <SnackbarProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode/:branch/:path*`}
            render={() => (
              <SongActionsMenuItem
                closeMenu={mockHandleClose}
                openQrCodeDialog={mockOpenQrCodeDialog}
              />
            )}
          />
        </MemoryRouter>
      </SnackbarProvider>
    );

    expect(screen.getByText("Edit inline")).toBeInTheDocument();
  });

  it("renders exit button when on editor page", () => {
    const mockHandleClose = jest.fn();
    const mockOpenQrCodeDialog = jest.fn();

    render(
      <SnackbarProvider>
        <MemoryRouter initialEntries={["/repos/o/r/editor/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode/:branch/:path*`}
            render={() => (
              <SongActionsMenuItem
                closeMenu={mockHandleClose}
                openQrCodeDialog={mockOpenQrCodeDialog}
              />
            )}
          />
        </MemoryRouter>
      </SnackbarProvider>
    );

    expect(screen.getByText("Exit to viewer")).toBeInTheDocument();
  });
});
