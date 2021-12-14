import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LogoAppBarItem from "./LogoAppBarItem";

describe("LogoAppBarItem", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LogoAppBarItem />
      </MemoryRouter>
    );
  });
});
