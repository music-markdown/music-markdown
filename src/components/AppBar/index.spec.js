import { createTheme, ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppBar from "./index";

describe("AppBar", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  it("should render a styled AppBar", () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <MemoryRouter>
          <AppBar />
        </MemoryRouter>
      </ThemeProvider>
    );
  });
});
