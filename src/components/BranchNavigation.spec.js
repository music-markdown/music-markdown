import { Route, BrowserRouter as Router } from "react-router-dom";
import BranchNavigation from "./BranchNavigation";
import React from "react";
import ReactDOM from "react-dom";

describe("BranchNavigation", () => {
  it("renders without crashing", () => {
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
