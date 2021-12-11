import LogoAppBarItem from "./LogoAppBarItem";
import { MemoryRouter } from "react-router";
import { render } from "@testing-library/react";

describe("LogoAppBarItem", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LogoAppBarItem />
      </MemoryRouter>
    );
  });
});
