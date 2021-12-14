import { createTheme, ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RepoViewer from ".";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import { ReposProvider } from "../../context/ReposProvider";

describe("RepoViewer", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      render(
        <GitHubApiProvider>
          <ReposProvider>
            <ThemeProvider theme={createTheme()}>
              <RepoViewer />
            </ThemeProvider>
          </ReposProvider>
        </GitHubApiProvider>
      );
    });
  });
});
