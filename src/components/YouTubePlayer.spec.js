import { GlobalStateProvider } from "./GlobalState";
import { render } from "@testing-library/react";
import YouTubePlayer from "./YouTubePlayer";

describe("YouTubePlayer", () => {
  it("renders YouTube iframe when youTubeId is present and visible is true", () => {
    const { queryByTitle } = render(
      <GlobalStateProvider>
        <YouTubePlayer visible={true} youTubeId="abcd" />
      </GlobalStateProvider>
    );
    const youTubeIFrameElement = queryByTitle("YouTube");
    expect(youTubeIFrameElement).toBeInTheDocument();
  });

  it("does not render YouTube iframe when youTubeId is not present", () => {
    const { queryByTitle } = render(
      <GlobalStateProvider>
        <YouTubePlayer visible={true} youTubeId={null} />
      </GlobalStateProvider>
    );
    const youTubeIFrameElement = queryByTitle("YouTube");
    expect(youTubeIFrameElement).not.toBeInTheDocument();
  });

  it("does not render YouTube iframe when visible is false", () => {
    const { queryByTitle } = render(
      <GlobalStateProvider>
        <YouTubePlayer visible={false} youTubeId="abcd" />
      </GlobalStateProvider>
    );
    const youTubeIFrameElement = queryByTitle("YouTube");
    expect(youTubeIFrameElement).not.toBeInTheDocument();
  });
});
