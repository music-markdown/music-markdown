import { createTheme, ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import { SnackbarProvider } from "../../context/SnackbarProvider";
import AddRepository from "./AddRepository";

describe("AddRepository", () => {
  it("renders without crashing", () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <SnackbarProvider>
          <AddRepository handleAddRepository={() => true} />
        </SnackbarProvider>
      </ThemeProvider>
    );
  });
});
