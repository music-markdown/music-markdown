import { fireEvent, render } from "@testing-library/react";

import { GlobalStateProvider } from "../GlobalState";
import { MemoryRouter } from "react-router";
import MoreAppBarItem from "./MoreAppBarItem";

describe("MoreAppBarItem", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <MoreAppBarItem />
      </MemoryRouter>
    );
  });

  it("shows menu when more button is clicked", () => {
    const { getByRole, queryByText } = render(
      <GlobalStateProvider>
        <MemoryRouter>
          <MoreAppBarItem />
        </MemoryRouter>
      </GlobalStateProvider>
    );

    fireEvent.click(getByRole("button"));
    expect(queryByText("Set GitHub Token")).toBeInTheDocument();
  });
});
