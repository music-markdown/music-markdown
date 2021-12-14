import { render } from "@testing-library/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FileViewer from ".";
import { REPO_REGEX } from "../../lib/constants";
import { mockMasterGetContentsResponse } from "../../lib/MockGithubResponses";

describe("FileViewer", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  it("renders without crashing", () => {
    fetch.mockResponse(JSON.stringify(mockMasterGetContentsResponse));
    render(
      <Router>
        <Route
          path={`${REPO_REGEX}/browser/:branch/:path*`}
          component={FileViewer}
        />
      </Router>
    );
  });
});
