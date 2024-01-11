import { render } from "@testing-library/react";
import fetch from "jest-fetch-mock";
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
        <Route exact path={`${REPO_REGEX}/editor/:branch/:path*`}>
          <Edit />
        </Route>
      </Router>,
    );
  });
});
