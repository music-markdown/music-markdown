import { Route, BrowserRouter as Router } from "react-router-dom";
import BranchNavigation from "./BranchNavigation";
import { mockGetBranchesResponse } from "../lib/MockGithubResponses";
import { render } from "@testing-library/react";
import { REPO_REGEX } from "../lib/constants";

describe("BranchNavigation", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  it("renders without crashing", () => {
    fetch.mockResponse(JSON.stringify(mockGetBranchesResponse));
    render(
      <Router>
        <Route path={REPO_REGEX} exact component={BranchNavigation} />
      </Router>
    );
  });
});
