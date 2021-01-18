import { YouTubePlayer, YouTubeToggle } from "./YouTube";
import { GlobalStateProvider } from "./GlobalState";
import { render } from "@testing-library/react";

describe("YouTubePlayer", () => {
  it("renders without youTubeId", () => {
    render(
      <GlobalStateProvider>
        <YouTubePlayer />
      </GlobalStateProvider>
    );
  });

  it("renders with youTubeId", () => {
    render(
      <GlobalStateProvider>
        <YouTubePlayer youTubeId="abcd" />
      </GlobalStateProvider>
    );
  });
});

describe("YouTubeToggle", () => {
  it("renders without youTubeId", () => {
    render(
      <GlobalStateProvider>
        <YouTubeToggle />
      </GlobalStateProvider>
    );
  });

  it("renders with youTubeId", () => {
    render(
      <GlobalStateProvider>
        <YouTubeToggle youTubeId="abcd" />
      </GlobalStateProvider>
    );
  });
});
