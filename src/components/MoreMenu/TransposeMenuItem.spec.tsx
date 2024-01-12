import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import { SongPrefsProvider } from "../../context/SongPrefsProvider";
import { REPO_REGEX } from "../../lib/constants";
import TransposeMenuItem from "./TransposeMenuItem";

interface TestLocation {
  search: string;
}

describe("TransposeMenuItem", () => {
  beforeEach(async () => {
    localStorage.clear();
  });

  it("increases query param to 1 when up is clicked", () => {
    let testLocation: TestLocation = { search: "" };

    render(
      <SongPrefsProvider>
        <MemoryRouter
          initialEntries={["/repos/o/r/viewer/b/song.md?transpose=0"]}
        >
          <Route
            path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
            render={() => <TransposeMenuItem />}
          />
          <Route
            path="*"
            render={({ location }) => {
              testLocation = location;
              return null;
            }}
          />
        </MemoryRouter>
      </SongPrefsProvider>,
    );

    fireEvent.click(screen.getByLabelText("Transpose up"));

    const searchParams = new URLSearchParams(testLocation.search);
    expect(searchParams.get("transpose")).toEqual("1");

    const songPrefs = JSON.parse(localStorage.getItem("songPrefs")!);
    expect(songPrefs["o/r/b/song.md"]).toEqual({ transpose: 1 });
  });

  it("decreases query param to -1 when down is clicked", () => {
    let testLocation: TestLocation = { search: "" };

    render(
      <SongPrefsProvider>
        <MemoryRouter
          initialEntries={["/repos/o/r/viewer/b/song.md?transpose=0"]}
        >
          <Route
            path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
            render={() => <TransposeMenuItem />}
          />
          <Route
            path="*"
            render={({ location }) => {
              testLocation = location;
              return null;
            }}
          />
        </MemoryRouter>
      </SongPrefsProvider>,
    );

    fireEvent.click(screen.getByLabelText("Transpose down"));

    const searchParams = new URLSearchParams(testLocation.search);
    expect(searchParams.get("transpose")).toEqual("-1");

    const songPrefs = JSON.parse(localStorage.getItem("songPrefs")!);
    expect(songPrefs["o/r/b/song.md"]).toEqual({ transpose: -1 });
  });

  it("decreases query param to 0 when down is clicked", () => {
    let testLocation: TestLocation = { search: "" };

    render(
      <SongPrefsProvider>
        <MemoryRouter
          initialEntries={["/repos/o/r/viewer/b/song.md?transpose=1"]}
        >
          <Route
            path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
            render={() => <TransposeMenuItem />}
          />
          <Route
            path="*"
            render={({ location }) => {
              testLocation = location;
              return null;
            }}
          />
        </MemoryRouter>
      </SongPrefsProvider>,
    );

    fireEvent.click(screen.getByText("Reset"));

    const searchParams = new URLSearchParams(testLocation.search);
    expect(searchParams.get("transpose")).toEqual("0");

    const songPrefs = JSON.parse(localStorage.getItem("songPrefs")!);
    expect(songPrefs["o/r/b/song.md"]).toBeUndefined();
  });
});
