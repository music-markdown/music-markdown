import { Route, BrowserRouter as Router } from "react-router-dom";
import BranchNavigation from "./BranchNavigation";
import React from "react";
import ReactDOM from "react-dom";
import { mockGetBranchesResponse } from "../lib/MockGithubResponses";

describe("BranchNavigation", () => {
  it("renders without crashing", () => {
    fetch.mockResponse(JSON.stringify(mockGetBranchesResponse));
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <Route path="/" exact component={BranchNavigation} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
