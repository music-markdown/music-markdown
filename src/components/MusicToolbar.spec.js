import { Route, BrowserRouter as Router } from "react-router-dom";
import { GlobalStateProvider } from "./GlobalState";
import MusicToolbar from "./MusicToolbar";
import React from "react";
import ReactDOM from "react-dom";

describe("MusicToolbar", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <GlobalStateProvider>
        <Router>
          <Route path="/" exact component={MusicToolbar} />
        </Router>
      </GlobalStateProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
