import { GlobalStateProvider, useYouTubeId } from "../GlobalState";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { fireEvent, render } from "@testing-library/react";

import YouTubeAppBarItem from "./YouTubeAppBarItem";
import { useEffect } from "react";

function YouTubeIdSetter() {
  const { setYouTubeId } = useYouTubeId();
  useEffect(() => setYouTubeId("abcd"));
  return null;
}

describe("YouTubeAppBarItem", () => {
  it("renders YouTube button when youTubeId is present", () => {
    const { queryByRole } = render(
      <GlobalStateProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubeIdSetter />
          <YouTubeAppBarItem />
        </ThemeProvider>
      </GlobalStateProvider>
    );
    const youTubeButton = queryByRole("button");
    expect(youTubeButton).toBeInTheDocument();
  });

  it("doest not render YouTube button when youTubeId is not present", () => {
    const { queryByRole } = render(
      <GlobalStateProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubeAppBarItem />
        </ThemeProvider>
      </GlobalStateProvider>
    );
    const youTubeButton = queryByRole("button");
    expect(youTubeButton).not.toBeInTheDocument();
  });

  it("renders YouTube iframe when YouTube button clicked", () => {
    const { getByRole, queryByTitle } = render(
      <GlobalStateProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubeIdSetter />
          <YouTubeAppBarItem />
        </ThemeProvider>
      </GlobalStateProvider>
    );
    expect(queryByTitle("YouTube")).not.toBeInTheDocument();
    fireEvent.click(getByRole("button"));
    expect(queryByTitle("YouTube")).toBeInTheDocument();
  });
});
