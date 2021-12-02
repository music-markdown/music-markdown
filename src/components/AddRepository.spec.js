import { ThemeProvider, createTheme } from "@mui/material/styles";

import AddRepository from "./AddRepository";
import { GlobalStateProvider } from "./GlobalState";
import { render } from "@testing-library/react";

describe("AddRepository", () => {
  it("renders without crashing", () => {
    render(
      <GlobalStateProvider>
        <ThemeProvider theme={createTheme()}>
          <AddRepository handleAddRepository={() => true} />
        </ThemeProvider>
      </GlobalStateProvider>
    );
  });
});
