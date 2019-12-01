import { Route, BrowserRouter as Router } from "react-router-dom";
import GithubTokenDialog from "./GithubTokenDialog";
import { GlobalStateProvider } from "./GlobalState";
import React from "react";
import ReactDOM from "react-dom";

describe("GithubTokenDialog", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <GlobalStateProvider>
        <Router>
          <Route path="/" exact component={GithubTokenDialog} />
        </Router>{" "}
      </GlobalStateProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
