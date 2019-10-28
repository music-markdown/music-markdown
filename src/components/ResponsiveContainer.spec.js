import React from "react";
import ReactDOM from "react-dom";
import ResponsiveContainer from "./ResponsiveContainer";

describe("ResponsiveContainer", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ResponsiveContainer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
