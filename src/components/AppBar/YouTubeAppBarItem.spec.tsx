import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { fireEvent, render, screen } from "@testing-library/react";
import { useEffect } from "react";
import {
  YouTubeIdProvider,
  useYouTubeId,
} from "../../context/YouTubeIdProvider";
import YouTubeAppBarItem from "./YouTubeAppBarItem";

function YouTubeIdSetter() {
  const { setYouTubeId } = useYouTubeId();
  useEffect(() => setYouTubeId("abcd"));
  return null;
}

describe("YouTubeAppBarItem", () => {
  it("renders YouTube button when youTubeId is present", () => {
    render(
      <YouTubeIdProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubeIdSetter />
          <YouTubeAppBarItem />
        </ThemeProvider>
      </YouTubeIdProvider>,
    );
    const youTubeButton = screen.queryByRole("button");
    expect(youTubeButton).toBeInTheDocument();
  });

  it("doest not render YouTube button when youTubeId is not present", () => {
    render(
      <YouTubeIdProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubeAppBarItem />
        </ThemeProvider>
      </YouTubeIdProvider>,
    );
    const youTubeButton = screen.queryByRole("button");
    expect(youTubeButton).not.toBeInTheDocument();
  });

  it("renders YouTube iframe when YouTube button clicked", () => {
    render(
      <YouTubeIdProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubeIdSetter />
          <YouTubeAppBarItem />
        </ThemeProvider>
      </YouTubeIdProvider>,
    );
    expect(screen.queryByTitle("YouTube")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByTitle("YouTube")).toBeInTheDocument();
  });
});
