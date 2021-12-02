import { ThemeProvider, createTheme } from "@mui/material/styles";

import { GlobalStateProvider } from "./GlobalState";
import YouTubePlayer from "./YouTubePlayer";
import { render } from "@testing-library/react";

describe("YouTubePlayer", () => {
  it("renders YouTube iframe when youTubeId is present and visible is true", () => {
    const { queryByTitle } = render(
      <GlobalStateProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubePlayer visible={true} youTubeId="abcd" />
        </ThemeProvider>
      </GlobalStateProvider>
    );
    const youTubeIFrameElement = queryByTitle("YouTube");
    expect(youTubeIFrameElement).toBeInTheDocument();
  });

  it("does not render YouTube iframe when youTubeId is not present", () => {
    const { queryByTitle } = render(
      <GlobalStateProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubePlayer visible={true} youTubeId={null} />
        </ThemeProvider>
      </GlobalStateProvider>
    );
    const youTubeIFrameElement = queryByTitle("YouTube");
    expect(youTubeIFrameElement).not.toBeInTheDocument();
  });

  it("does not render YouTube iframe when visible is false", () => {
    const { queryByTitle } = render(
      <GlobalStateProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubePlayer visible={false} youTubeId="abcd" />
        </ThemeProvider>
      </GlobalStateProvider>
    );
    const youTubeIFrameElement = queryByTitle("YouTube");
    expect(youTubeIFrameElement).not.toBeInTheDocument();
  });
});
