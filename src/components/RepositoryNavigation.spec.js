import { Route, BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import RepositoryNavigation from "./RepositoryNavigation";
import { mockMasterGetContentsResponse } from "../lib/MockGithubResponses";

describe("RepositoryNavigation", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  it("renders without crashing", () => {
    fetch.mockResponse(JSON.stringify(mockMasterGetContentsResponse));
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <Route path="/" exact component={RepositoryNavigation} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
