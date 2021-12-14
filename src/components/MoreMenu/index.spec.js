import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MoreMenu from ".";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import { ThemeProvider } from "../../context/ThemeProvider";

describe("MoreMenu", () => {
  it("doesn't render Song Actions at home", () => {
    const mockAnchorEl = document.createElement("button");
    const { queryByText } = render(
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
    );

    expect(queryByText("Song Actions")).not.toBeInTheDocument();
  });

  it("renders Song Actions at viewer", () => {
    const mockAnchorEl = document.createElement("button");
    const { queryByText } = render(
      <GitHubApiProvider>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
            <MoreMenu
              open={true}
              close={() => undefined}
              anchorEl={mockAnchorEl}
            />
          </MemoryRouter>
        </ThemeProvider>
      </GitHubApiProvider>
    );

    expect(queryByText("Song Actions")).toBeInTheDocument();
  });

  it("doesn't render Transpose at home", () => {
    const mockAnchorEl = document.createElement("button");
    const { queryByText } = render(
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
    );

    expect(queryByText("Transpose")).not.toBeInTheDocument();
  });

  it("renders Transpose at viewer", () => {
    const mockAnchorEl = document.createElement("button");
    const { queryByText } = render(
      <GitHubApiProvider>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
            <MoreMenu
              open={true}
              close={() => undefined}
              anchorEl={mockAnchorEl}
            />
          </MemoryRouter>
        </ThemeProvider>
      </GitHubApiProvider>
    );

    expect(queryByText("Transpose")).toBeInTheDocument();
  });

  it("doesn't render Columns at home", () => {
    const mockAnchorEl = document.createElement("button");
    const { queryByText } = render(
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
    );

    expect(queryByText("Columns")).not.toBeInTheDocument();
  });

  it("renders Columns at viewer", () => {
    const mockAnchorEl = document.createElement("button");
    const { queryByText } = render(
      <GitHubApiProvider>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
            <MoreMenu
              open={true}
              close={() => undefined}
              anchorEl={mockAnchorEl}
            />
          </MemoryRouter>
        </ThemeProvider>
      </GitHubApiProvider>
    );

    expect(queryByText("Columns")).toBeInTheDocument();
  });

  it("renders theme menu item at home", () => {
    const mockAnchorEl = document.createElement("button");
    const { queryByText } = render(
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
    );

    expect(queryByText("Theme")).toBeInTheDocument();
  });

  it("renders GitHub token button at home", () => {
    const mockAnchorEl = document.createElement("button");
    const { queryByText } = render(
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
    );

    expect(queryByText("GitHub Token")).toBeInTheDocument();
  });
});
