import { Route, BrowserRouter as Router } from "react-router-dom";
import { GlobalStateProvider } from "./GlobalState";
import MarkdownViewer from "./MarkdownViewer";
import { mockMasterGetContentsResponse } from "../lib/MockGithubResponses";
import { render } from "@testing-library/react";
import { REPO_REGEX } from "../lib/constants";

describe("MarkdownViewer", () => {
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
            path={`${REPO_REGEX}/viewer/:branch/:path+`}
            exact
            component={MarkdownViewer}
          />
        </Router>
      </GlobalStateProvider>
    );
  });
});
