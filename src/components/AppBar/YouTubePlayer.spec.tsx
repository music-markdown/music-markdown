import { createTheme, ThemeProvider } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import YouTubePlayer from "./YouTubePlayer";

describe("YouTubePlayer", () => {
  it("renders YouTube iframe when youTubeId is present and visible is true", () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <YouTubePlayer visible={true} youTubeId="abcd" />
      </ThemeProvider>
    );
    expect(screen.getByTitle("YouTube")).toBeInTheDocument();
  });

  it("does not render YouTube iframe when youTubeId is not present", () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <YouTubePlayer visible={true} youTubeId={null} />
      </ThemeProvider>
    );
    expect(screen.queryByTitle("YouTube")).not.toBeInTheDocument();
  });

  it("does not render YouTube iframe when visible is false", () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <YouTubePlayer visible={false} youTubeId="abcd" />
      </ThemeProvider>
    );
    expect(screen.queryByTitle("YouTube")).not.toBeInTheDocument();
  });
});
