import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fireEvent, render, screen } from "@testing-library/react";
import { useEffect } from "react";
import {
  AutoScrollProvider,
  useAutoScroll,
} from "../../context/AutoScrollProvider";
import AutoScrollAppBarItem from "./AutoScrollAppBarItem";

function AutoScrollSetter() {
  const { setAutoScroll } = useAutoScroll();
  useEffect(() => setAutoScroll("3,10"));
  return null;
}

describe("AutoScrollAppBarItem", () => {
  it("renders AutoScroll button when autoScroll is present", () => {
    render(
      <AutoScrollProvider>
        <ThemeProvider theme={createTheme()}>
          <AutoScrollSetter />
          <AutoScrollAppBarItem />
        </ThemeProvider>
      </AutoScrollProvider>
    );
    const autoScrollButton = screen.queryByRole("button");
    expect(autoScrollButton).toBeInTheDocument();
  });

  it("does not render AutoScroll button when autoScroll is not present", () => {
    render(
      <AutoScrollProvider>
        <ThemeProvider theme={createTheme()}>
          <AutoScrollAppBarItem />
        </ThemeProvider>
      </AutoScrollProvider>
    );
    const autoScrollButton = screen.queryByRole("button");
    expect(autoScrollButton).not.toBeInTheDocument();
  });

  it("toggles button color when AutoScroll button clicked", () => {
    render(
      <AutoScrollProvider>
        <ThemeProvider theme={createTheme()}>
          <AutoScrollSetter />
          <AutoScrollAppBarItem />
        </ThemeProvider>
      </AutoScrollProvider>
    );
    const autoScrollButton = screen.getByRole("button");
    expect(autoScrollButton).toHaveStyle("color: rgba(0, 0, 0, 0.54)"); // default color
    fireEvent.click(autoScrollButton);
    expect(autoScrollButton).toHaveStyle("color: rgb(220, 0, 78)"); // secondary color
  });
});
