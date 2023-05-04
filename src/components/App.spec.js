import { act, render } from "@testing-library/react";
import App from "./App";

it("renders without crashing", async () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<App />);
  });
});
