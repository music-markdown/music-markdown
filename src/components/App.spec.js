import App from "./App";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";

it("renders without crashing", async () => {
  await act(async () => {
    render(<App />);
  });
});
