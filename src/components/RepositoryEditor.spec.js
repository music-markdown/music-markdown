import { ThemeProvider, createTheme } from "@mui/material/styles";

import { GlobalStateProvider } from "./GlobalState";
import RepositoryEditor from "./RepositoryEditor";
import { render } from "@testing-library/react";

describe("RepositoryEditor", () => {
  it("renders without crashing", () => {
    render(
      <GlobalStateProvider>
        <ThemeProvider theme={createTheme()}>
          <RepositoryEditor />
        </ThemeProvider>
      </GlobalStateProvider>
    );
  });
});
