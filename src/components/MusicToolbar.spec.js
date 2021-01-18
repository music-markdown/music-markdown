import { render } from "@testing-library/react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { REPO_REGEX } from "../lib/constants";
import { GlobalStateProvider } from "./GlobalState";
import MusicToolbar from "./MusicToolbar";

describe("MusicToolbar", () => {
  it("renders without crashing", () => {
    render(
      <GlobalStateProvider>
        <Router>
          <Route
            path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
            component={MusicToolbar}
          />
        </Router>
      </GlobalStateProvider>
    );
  });
});
