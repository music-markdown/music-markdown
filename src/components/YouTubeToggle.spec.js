import { ThemeProvider, createTheme } from "@mui/material/styles";
import { fireEvent, render } from "@testing-library/react";

import { GlobalStateProvider } from "./GlobalState";
import YouTubeToggle from "./YouTubeToggle";

describe("YouTubeToggle", () => {
  it("renders YouTube button when youTubeId is present", () => {
    const { queryByRole } = render(
      <GlobalStateProvider>
        <ThemeProvider theme={createTheme()}>
          <YouTubeToggle youTubeId="abcd" />
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
          <YouTubeToggle />
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
          <YouTubeToggle youTubeId="abcd" />
        </ThemeProvider>
      </GlobalStateProvider>
    );
    expect(queryByTitle("YouTube")).not.toBeInTheDocument();
    fireEvent.click(getByRole("button"));
    expect(queryByTitle("YouTube")).toBeInTheDocument();
  });
});
