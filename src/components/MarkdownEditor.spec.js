import { Route, BrowserRouter as Router } from "react-router-dom";
import { GlobalStateProvider } from "./GlobalState";
import MarkdownEditor from "./MarkdownEditor";
import { mockMasterGetContentsResponse } from "../lib/MockGithubResponses";
import { render } from "@testing-library/react";
import { REPO_REGEX } from "../lib/constants";

describe("MarkdownEditor", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  it("renders without crashing", () => {
    fetch.mockResponse(JSON.stringify(mockMasterGetContentsResponse));
    render(
      <GlobalStateProvider>
        <Router>
          <Route
            path={`${REPO_REGEX}/editor/:branch/:path*`}
            exact
            component={MarkdownEditor}
          />
        </Router>
      </GlobalStateProvider>
    );
  });
});
