import { createTheme, ThemeProvider } from "@mui/material/styles";
import { act, render } from "@testing-library/react";
import RepoViewer from ".";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import { ReposProvider } from "../../context/ReposProvider";
import SnackbarProvider from "../../context/SnackbarProvider";

describe("RepoViewer", () => {
  it("renders without crashing", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <GitHubApiProvider>
          <ReposProvider>
            <ThemeProvider theme={createTheme()}>
              <SnackbarProvider>
                <RepoViewer />
              </SnackbarProvider>
            </ThemeProvider>
          </ReposProvider>
        </GitHubApiProvider>
      );
    });
  });
});
