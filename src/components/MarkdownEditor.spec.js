import { Route, BrowserRouter as Router } from "react-router-dom";
import { GlobalStateProvider } from "./GlobalState";
import MarkdownEditor from "./MarkdownEditor";
import React from "react";
import ReactDOM from "react-dom";
import { mockMasterGetContentsResponse } from "../lib/MockGithubResponses";

describe("MarkdownEditor", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  it("renders without crashing", () => {
    fetch.mockResponse(JSON.stringify(mockMasterGetContentsResponse));
    const div = document.createElement("div");
    ReactDOM.render(
      <GlobalStateProvider>
        <Router>
          <Route path="/" exact component={MarkdownEditor} />
        </Router>
      </GlobalStateProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
