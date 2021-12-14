import { render } from "@testing-library/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { REPO_REGEX } from "../../lib/constants";
import { mockMasterGetContentsResponse } from "../../lib/MockGithubResponses";
import Edit from "./Edit";

describe("Edit", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  it("renders without crashing", () => {
    fetch.mockResponse(JSON.stringify(mockMasterGetContentsResponse));
    render(
      <Router>
        <Route
          path={`${REPO_REGEX}/editor/:branch/:path*`}
          exact
          component={Edit}
        />
      </Router>
    );
  });
});
