import { MemoryRouter, Route } from "react-router";
import { fireEvent, render } from "@testing-library/react";

import { GlobalStateProvider } from "../GlobalState";
import { REPO_REGEX } from "../../lib/constants";
import TransposeMenuItem from "./TransposeMenuItem";

describe("TransposeMenuItem", () => {
  it("increases query param to 1 when up is clicked", () => {
    let testLocation;

    const { getByLabelText } = render(
      <GlobalStateProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
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
      </GlobalStateProvider>
    );

    fireEvent.click(getByLabelText("Transpose up"));

    const searchParams = new URLSearchParams(testLocation.search);
    expect(searchParams.get("transpose")).toEqual("1");
  });

  it("decreases query param to -1 when down is clicked", () => {
    let testLocation;

    const { getByLabelText } = render(
      <GlobalStateProvider>
        <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
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
      </GlobalStateProvider>
    );

    fireEvent.click(getByLabelText("Transpose down"));

    const searchParams = new URLSearchParams(testLocation.search);
    expect(searchParams.get("transpose")).toEqual("-1");
  });

  it("clears the query param when reset is clicked", () => {
    let testLocation;

    const { getByText } = render(
      <GlobalStateProvider>
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
      </GlobalStateProvider>
    );

    fireEvent.click(getByText("Reset"));

    const searchParams = new URLSearchParams(testLocation.search);
    expect(searchParams.has("transpose")).toBeFalsy();
  });
});
