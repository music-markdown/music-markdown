import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import { SongPrefsProvider } from "../../context/SongPrefsProvider";
import { REPO_REGEX } from "../../lib/constants";
import ZoomMenuItem from "./ZoomMenuItem";

describe("ZoomMenuItem", () => {
  beforeEach(async () => {
    localStorage.clear();
  });

  it("increases zoom to 1.05 when zoom in button is clicked", async () => {
    render(
      <SongPrefsProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
            render={() => <ZoomMenuItem />}
          />
        </MemoryRouter>
      </SongPrefsProvider>
    );

    fireEvent.click(screen.getByLabelText("Zoom in"));
    expect(screen.getByLabelText("Zoom amount")).toHaveTextContent("105%");

    const songPrefs = JSON.parse(localStorage.getItem("songPrefs"));
    expect(songPrefs["o/r/b/song.md"]).toEqual({ zoom: 1.05 });
  });

  it("increases zoom to 1.10 when zoom in button is clicked twice", () => {
    render(
      <SongPrefsProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
            render={() => <ZoomMenuItem />}
          />
        </MemoryRouter>
      </SongPrefsProvider>
    );

    fireEvent.click(screen.getByLabelText("Zoom in"));
    fireEvent.click(screen.getByLabelText("Zoom in"));
    expect(screen.getByLabelText("Zoom amount")).toHaveTextContent("110%");

    const songPrefs = JSON.parse(localStorage.getItem("songPrefs"));
    expect(songPrefs["o/r/b/song.md"]).toEqual({ zoom: 1.1 });
  });

  it("decreases zoom to .95 when zoom out button is clicked", () => {
    render(
      <SongPrefsProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
            render={() => <ZoomMenuItem />}
          />
        </MemoryRouter>
      </SongPrefsProvider>
    );

    fireEvent.click(screen.getByLabelText("Zoom out"));
    expect(screen.getByLabelText("Zoom amount")).toHaveTextContent("95%");

    const songPrefs = JSON.parse(localStorage.getItem("songPrefs"));
    expect(songPrefs["o/r/b/song.md"]).toEqual({ zoom: 0.95 });
  });

  it("resets zoom to 1 when reset button is clicked", () => {
    localStorage.setItem(
      "songPrefs",
      JSON.stringify({ "o/r/b/song.md": { zoom: 1.05 } })
    );

    render(
      <SongPrefsProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
            render={() => <ZoomMenuItem />}
          />
        </MemoryRouter>
      </SongPrefsProvider>
    );

    fireEvent.click(screen.getByLabelText("Zoom reset"));
    expect(screen.getByLabelText("Zoom amount")).toHaveTextContent("100%");

    const songPrefs = JSON.parse(localStorage.getItem("songPrefs"));
    expect(songPrefs["o/r/b/song.md"]).toBeUndefined();
  });
});
