import { Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Route path="/" exact component={App} />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
