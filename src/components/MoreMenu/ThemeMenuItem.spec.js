import { fireEvent, render } from "@testing-library/react";
import { ThemeProvider } from "../../context/ThemeProvider";
import ThemeMenuItem from "./ThemeMenuItem";

describe("ThemeMenuItem", () => {
  it("sets theme to light when light button is clicked", () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemeMenuItem />
      </ThemeProvider>
    );

    fireEvent.click(getByText("Light"));
    expect(JSON.parse(localStorage.getItem("themeName"))).toEqual("light");
  });

  it("sets theme to dark when dark button is clicked", () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemeMenuItem />
      </ThemeProvider>
    );

    fireEvent.click(getByText("Dark"));
    expect(JSON.parse(localStorage.getItem("themeName"))).toEqual("dark");
  });
});
