import { GlobalStateProvider } from "./GlobalState";
import MusicMarkdown from "./MusicMarkdown";
import { render } from "@testing-library/react";

describe("MusicMarkdown", () => {
  it("renders without crashing", () => {
    render(
      <GlobalStateProvider>
        <MusicMarkdown source="" />
      </GlobalStateProvider>
    );
  });
});
