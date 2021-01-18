import MusicMarkdownNavbar from "./MusicMarkdownNavbar";
import { render } from "@testing-library/react";
import { GlobalStateProvider } from "./GlobalState";
import { HashRouter as Router } from "react-router-dom";

describe("MusicMarkdownNavbar", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  it("should render a styled MusicMarkdownNavbar", () => {
    render(
      <GlobalStateProvider>
        <Router>
          <MusicMarkdownNavbar />
        </Router>
      </GlobalStateProvider>
    );
  });
});
