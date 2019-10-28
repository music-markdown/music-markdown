import { Route, BrowserRouter as Router } from "react-router-dom";
import { GlobalStateProvider } from "./GlobalState";
import React from "react";
import ReactDOM from "react-dom";
import RepositoryEditor from "./RepositoryEditor";

describe("RepositoryEditor", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <GlobalStateProvider>
        <Router>
          <Route path="/" exact component={RepositoryEditor} />
        </Router>
      </GlobalStateProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
