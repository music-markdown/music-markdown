import { GlobalStateProvider } from "./GlobalState";
import MusicMarkdown from "./MusicMarkdown";
import React from "react";
import ReactDOM from "react-dom";

describe("MusicMarkdown", () => {
  it("renders without crashing", () => {
    ReactDOM.render(
      <GlobalStateProvider>
        <MusicMarkdown source="" />
      </GlobalStateProvider>,
      document.createElement("div")
    );
  });
});
