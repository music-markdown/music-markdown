import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fireEvent, render } from "@testing-library/react";
import { useEffect } from "react";
import {
  useYouTubeId,
  YouTubeIdProvider,
} from "../../context/YouTubeIdProvider";
import YouTubeAppBarItem from "./YouTubeAppBarItem";

function YouTubeIdSetter() {
  const { setYouTubeId } = useYouTubeId();
  useEffect(() => setYouTubeId("abcd"));
  return null;
}

describe("YouTubeAppBarItem", () => {
  it("renders YouTube button when youTubeId is present", () => {
    const { queryByRole } = render(
      <YouTubeIdProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubeIdSetter />
          <YouTubeAppBarItem />
        </ThemeProvider>
      </YouTubeIdProvider>
    );
    const youTubeButton = queryByRole("button");
    expect(youTubeButton).toBeInTheDocument();
  });

  it("doest not render YouTube button when youTubeId is not present", () => {
    const { queryByRole } = render(
      <YouTubeIdProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubeAppBarItem />
        </ThemeProvider>
      </YouTubeIdProvider>
    );
    const youTubeButton = queryByRole("button");
    expect(youTubeButton).not.toBeInTheDocument();
  });

  it("renders YouTube iframe when YouTube button clicked", () => {
    const { getByRole, queryByTitle } = render(
      <YouTubeIdProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubeIdSetter />
          <YouTubeAppBarItem />
        </ThemeProvider>
      </YouTubeIdProvider>
    );
    expect(queryByTitle("YouTube")).not.toBeInTheDocument();
    fireEvent.click(getByRole("button"));
    expect(queryByTitle("YouTube")).toBeInTheDocument();
  });
});
