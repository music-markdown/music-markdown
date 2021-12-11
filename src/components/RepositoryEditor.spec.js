import { ThemeProvider, createTheme } from "@mui/material/styles";

import { GlobalStateProvider } from "./GlobalState";
import RepositoryEditor from "./RepositoryEditor";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";

describe("RepositoryEditor", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      render(
        <GlobalStateProvider>
          <ThemeProvider theme={createTheme()}>
            <RepositoryEditor />
          </ThemeProvider>
        </GlobalStateProvider>
      );
    });
  });
});
