import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppBar from "./index";
import { GlobalStateProvider } from "../GlobalState";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

describe("AppBar", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  it("should render a styled AppBar", () => {
    render(
      <GlobalStateProvider>
        <ThemeProvider theme={createTheme()}>
          <MemoryRouter>
            <AppBar />
          </MemoryRouter>
        </ThemeProvider>
      </GlobalStateProvider>
    );
  });
});
