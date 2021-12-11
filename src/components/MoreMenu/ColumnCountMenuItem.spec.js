import { MemoryRouter, Route } from "react-router";
import { fireEvent, render } from "@testing-library/react";

import ColumnCountMenuItem from "./ColumnCountMenuItem";
import { GlobalStateProvider } from "../GlobalState";
import { REPO_REGEX } from "../../lib/constants";

describe("ColumnCountMenuItem", () => {
  it("sets columns query param to 2 when 2 columns are selected", () => {
    let testLocation;

    const { getByText } = render(
      <GlobalStateProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
          <Route
            path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
            render={() => <ColumnCountMenuItem />}
          />
          <Route
            path="*"
            render={({ location }) => {
              testLocation = location;
              return null;
            }}
          />
        </MemoryRouter>
      </GlobalStateProvider>
    );

    fireEvent.click(getByText("2"));

    const searchParams = new URLSearchParams(testLocation.search);
    expect(searchParams.get("columns")).toEqual("2");
  });

  it("clears columns query when 1 column is selected", () => {
    let testLocation;

    const { getByText } = render(
      <GlobalStateProvider>
        <MemoryRouter
          initialEntries={["/repos/o/r/viewer/b/song.md?columns=4"]}
        >
          <Route
            path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
            render={() => <ColumnCountMenuItem />}
          />
          <Route
            path="*"
            render={({ location }) => {
              testLocation = location;
              return null;
            }}
          />
        </MemoryRouter>
      </GlobalStateProvider>
    );

    fireEvent.click(getByText("1"));

    const searchParams = new URLSearchParams(testLocation.search);
    expect(searchParams.has("columns")).toBeFalsy();
  });
});
