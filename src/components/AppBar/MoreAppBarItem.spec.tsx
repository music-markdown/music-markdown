import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import { ThemeProvider } from "../../context/ThemeProvider";
import MoreAppBarItem from "./MoreAppBarItem";

describe("MoreAppBarItem", () => {
  it("shows menu when more button is clicked", () => {
    render(
      <GitHubApiProvider>
        <ThemeProvider>
          <MemoryRouter>
            <MoreAppBarItem />
          </MemoryRouter>
        </ThemeProvider>
      </GitHubApiProvider>,
    );

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Set GitHub Token")).toBeInTheDocument();
  });
});
