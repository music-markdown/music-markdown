import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import { SnackbarProvider } from "../../context/SnackbarProvider";
import { REPO_REGEX } from "../../lib/constants";
import QrCodeDialog from "./QrCodeDialog";

describe("QrCodeDialog", () => {
  it("renders qr code dialog", () => {
    const mockHandleClose = jest.fn();

    render(
      <SnackbarProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode/:branch/:path*`}
            render={() => <QrCodeDialog open={true} close={mockHandleClose} />}
          />
        </MemoryRouter>
      </SnackbarProvider>
    );

    expect(screen.getByText("Song QR Code")).toBeInTheDocument();
  });

  it("calls close callback when close button is clicked", () => {
    const mockHandleClose = jest.fn();

    render(
      <SnackbarProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode/:branch/:path*`}
            render={() => <QrCodeDialog open={true} close={mockHandleClose} />}
          />
        </MemoryRouter>
      </SnackbarProvider>
    );

    fireEvent.click(screen.getByText("Close"));
    expect(mockHandleClose).toBeCalled();
  });
});
