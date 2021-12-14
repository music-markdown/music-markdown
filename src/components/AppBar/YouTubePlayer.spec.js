import { createTheme, ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import YouTubePlayer from "./YouTubePlayer";

describe("YouTubePlayer", () => {
  it("renders YouTube iframe when youTubeId is present and visible is true", () => {
    const { queryByTitle } = render(
      <ThemeProvider theme={createTheme()}>
        <YouTubePlayer visible={true} youTubeId="abcd" />
      </ThemeProvider>
    );
    const youTubeIFrameElement = queryByTitle("YouTube");
    expect(youTubeIFrameElement).toBeInTheDocument();
  });

  it("does not render YouTube iframe when youTubeId is not present", () => {
    const { queryByTitle } = render(
      <ThemeProvider theme={createTheme()}>
        <YouTubePlayer visible={true} youTubeId={null} />
      </ThemeProvider>
    );
    const youTubeIFrameElement = queryByTitle("YouTube");
    expect(youTubeIFrameElement).not.toBeInTheDocument();
  });

  it("does not render YouTube iframe when visible is false", () => {
    const { queryByTitle } = render(
      <ThemeProvider theme={createTheme()}>
        <YouTubePlayer visible={false} youTubeId="abcd" />
      </ThemeProvider>
    );
    const youTubeIFrameElement = queryByTitle("YouTube");
    expect(youTubeIFrameElement).not.toBeInTheDocument();
  });
});
