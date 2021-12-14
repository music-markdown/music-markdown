import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import { ThemeProvider } from "../../context/ThemeProvider";
import MoreAppBarItem from "./MoreAppBarItem";

describe("MoreAppBarItem", () => {
  it("shows menu when more button is clicked", () => {
    const { getByRole, queryByText } = render(
      <GitHubApiProvider>
        <ThemeProvider>
          <MemoryRouter>
            <MoreAppBarItem />
          </MemoryRouter>
        </ThemeProvider>
      </GitHubApiProvider>
    );

    fireEvent.click(getByRole("button"));
    expect(queryByText("Set GitHub Token")).toBeInTheDocument();
  });
});
