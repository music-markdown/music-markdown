import { Route, BrowserRouter as Router } from "react-router-dom";
import RepositoryNavigation from "./RepositoryNavigation";
import { mockMasterGetContentsResponse } from "../lib/MockGithubResponses";
import { render } from "@testing-library/react";
import { REPO_REGEX } from "../lib/constants";

describe("RepositoryNavigation", () => {
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
          component={RepositoryNavigation}
        />
      </Router>
    );
  });
});
