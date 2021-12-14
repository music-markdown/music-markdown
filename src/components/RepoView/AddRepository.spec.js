import { createTheme, ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import AddRepository from "./AddRepository";

describe("AddRepository", () => {
  it("renders without crashing", () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <AddRepository handleAddRepository={() => true} />
      </ThemeProvider>
    );
  });
});
