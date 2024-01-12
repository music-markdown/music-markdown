import { render } from "@testing-library/react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { mockMasterGetContentsResponse } from "../../lib/MockGithubResponses";
import { REPO_REGEX } from "../../lib/constants";
import Edit from "./Edit";

const fetch = createFetchMock(vi);
fetch.enableMocks();

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
