import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MoreMenu from ".";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import { SnackbarProvider } from "../../context/SnackbarProvider";
import { SongPrefsProvider } from "../../context/SongPrefsProvider";
import { ThemeProvider } from "../../context/ThemeProvider";

describe("MoreMenu", () => {
  it("doesn't render Song Actions at home", () => {
    const mockAnchorEl = document.createElement("button");
    render(
      <SongPrefsProvider>
        <GitHubApiProvider>
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <MoreMenu
                open={true}
                close={() => undefined}
                anchorEl={mockAnchorEl}
              />
            </MemoryRouter>
          </ThemeProvider>
        </GitHubApiProvider>
      </SongPrefsProvider>,
    );

    expect(screen.queryByText("Song Actions")).not.toBeInTheDocument();
  });

  it("renders Song Actions at viewer", () => {
    const mockAnchorEl = document.createElement("button");
    render(
      <SongPrefsProvider>
        <GitHubApiProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
                <MoreMenu
                  open={true}
                  close={() => undefined}
                  anchorEl={mockAnchorEl}
                />
              </MemoryRouter>
            </SnackbarProvider>
          </ThemeProvider>
        </GitHubApiProvider>
      </SongPrefsProvider>,
    );

    expect(screen.getByText("Song Actions")).toBeInTheDocument();
  });

  it("doesn't render Transpose at home", () => {
    const mockAnchorEl = document.createElement("button");
    render(
      <SongPrefsProvider>
        <GitHubApiProvider>
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <MoreMenu
                open={true}
                close={() => undefined}
                anchorEl={mockAnchorEl}
              />
            </MemoryRouter>
          </ThemeProvider>
        </GitHubApiProvider>
      </SongPrefsProvider>,
    );

    expect(screen.queryByText("Transpose")).not.toBeInTheDocument();
  });

  it("renders Transpose at viewer", () => {
    const mockAnchorEl = document.createElement("button");
    render(
      <SongPrefsProvider>
        <GitHubApiProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
                <MoreMenu
                  open={true}
                  close={() => undefined}
                  anchorEl={mockAnchorEl}
                />
              </MemoryRouter>
            </SnackbarProvider>
          </ThemeProvider>
        </GitHubApiProvider>
      </SongPrefsProvider>,
    );

    expect(screen.getByText("Transpose")).toBeInTheDocument();
  });

  it("doesn't render Columns at home", () => {
    const mockAnchorEl = document.createElement("button");
    render(
      <SongPrefsProvider>
        <GitHubApiProvider>
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <MoreMenu
                open={true}
                close={() => undefined}
                anchorEl={mockAnchorEl}
              />
            </MemoryRouter>
          </ThemeProvider>
        </GitHubApiProvider>
      </SongPrefsProvider>,
    );

    expect(screen.queryByText("Columns")).not.toBeInTheDocument();
  });

  it("renders Columns at viewer", () => {
    const mockAnchorEl = document.createElement("button");
    render(
      <SongPrefsProvider>
        <GitHubApiProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
                <MoreMenu
                  open={true}
                  close={() => undefined}
                  anchorEl={mockAnchorEl}
                />
              </MemoryRouter>
            </SnackbarProvider>
          </ThemeProvider>
        </GitHubApiProvider>
      </SongPrefsProvider>,
    );

    expect(screen.getByText("Columns")).toBeInTheDocument();
  });

  it("renders theme menu item at home", () => {
    const mockAnchorEl = document.createElement("button");
    render(
      <SongPrefsProvider>
        <GitHubApiProvider>
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <MoreMenu
                open={true}
                close={() => undefined}
                anchorEl={mockAnchorEl}
              />
            </MemoryRouter>
          </ThemeProvider>
        </GitHubApiProvider>
      </SongPrefsProvider>,
    );

    expect(screen.getByText("Theme")).toBeInTheDocument();
  });

  it("renders GitHub token button at home", () => {
    const mockAnchorEl = document.createElement("button");
    render(
      <SongPrefsProvider>
        <GitHubApiProvider>
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <MoreMenu
                open={true}
                close={() => undefined}
                anchorEl={mockAnchorEl}
              />
            </MemoryRouter>
          </ThemeProvider>
        </GitHubApiProvider>
      </SongPrefsProvider>,
    );

    expect(screen.getByText("GitHub Token")).toBeInTheDocument();
  });

  it("opens and closes qr code dialog when buttons clicked", async () => {
    const mockHandleClose = vi.fn();
    const mockAnchorEl = document.createElement("button");
    render(
      <SongPrefsProvider>
        <GitHubApiProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
                <MoreMenu
                  open={true}
                  close={mockHandleClose}
                  anchorEl={mockAnchorEl}
                />
              </MemoryRouter>
            </SnackbarProvider>
          </ThemeProvider>
        </GitHubApiProvider>
      </SongPrefsProvider>,
    );

    fireEvent.click(screen.getByText("Share song"));
    expect(screen.getByText("Song QR Code")).toBeInTheDocument();
    expect(mockHandleClose).toBeCalled();
    fireEvent.click(screen.getByText("Close"));
    await waitForElementToBeRemoved(() => screen.queryByText("Song QR Code"));
  });
});
