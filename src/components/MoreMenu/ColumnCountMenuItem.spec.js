import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import { SongPrefsProvider } from "../../context/SongPrefsProvider";
import { REPO_REGEX } from "../../lib/constants";
import ColumnCountMenuItem from "./ColumnCountMenuItem";

describe("ColumnCountMenuItem", () => {
  beforeEach(async () => {
    localStorage.clear();
  });

  it("sets columns query param to 2 when 2 columns are selected", () => {
    render(
      <SongPrefsProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
            render={() => <ColumnCountMenuItem />}
          />
        </MemoryRouter>
      </SongPrefsProvider>
    );

    fireEvent.click(screen.getByText("2"));

    const songPrefs = JSON.parse(localStorage.getItem("songPrefs"));
    expect(songPrefs["o/r/b/song.md"]).toEqual({ columns: 2 });
  });

  it("clears columns when 1 column is selected", () => {
    localStorage.setItem(
      "songPrefs",
      JSON.stringify({ "o/r/b/song.md": { columns: 2 } })
    );

    render(
      <SongPrefsProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
            render={() => <ColumnCountMenuItem />}
          />
        </MemoryRouter>
      </SongPrefsProvider>
    );

    fireEvent.click(screen.getByText("1"));

    const songPrefs = JSON.parse(localStorage.getItem("songPrefs"));
    expect(songPrefs["o/r/b/song.md"]).toBeUndefined();
  });
});
