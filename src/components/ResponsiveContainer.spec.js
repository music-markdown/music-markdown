import { render } from "@testing-library/react";
import ResponsiveContainer from "./ResponsiveContainer";

describe("ResponsiveContainer", () => {
  it("renders without crashing", () => {
    render(<ResponsiveContainer />);
  });
});
