import { Route, BrowserRouter as Router } from "react-router-dom";
import { GlobalStateProvider } from "./GlobalState";
import MarkdownViewer from "./MarkdownViewer";
import React from "react";
import ReactDOM from "react-dom";
import { mockMasterGetContentsResponse } from "../lib/MockGithubResponses";

describe("MarkdownViewer", () => {
  it("renders without crashing", () => {
    fetch.mockResponse(JSON.stringify(mockMasterGetContentsResponse));
    const div = document.createElement("div");
    ReactDOM.render(
      <GlobalStateProvider>
        <Router>
          <Route path="/" exact component={MarkdownViewer} />
        </Router>
      </GlobalStateProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
