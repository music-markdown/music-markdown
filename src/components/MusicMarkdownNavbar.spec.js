import { ThemeProvider, createTheme } from "@mui/material/styles";

import { GlobalStateProvider } from "./GlobalState";
import MusicMarkdownNavbar from "./MusicMarkdownNavbar";
import { HashRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";

describe("MusicMarkdownNavbar", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  it("should render a styled MusicMarkdownNavbar", () => {
    render(
      <GlobalStateProvider>
        <ThemeProvider theme={createTheme()}>
          <Router>
            <MusicMarkdownNavbar />
          </Router>
        </ThemeProvider>
      </GlobalStateProvider>
    );
  });
});
