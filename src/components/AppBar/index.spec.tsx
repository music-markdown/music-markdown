import { createTheme, ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import AppBar from "./index";

const fetch = createFetchMock(vi);
fetch.enableMocks();

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
      </ThemeProvider>,
    );
  });
});
