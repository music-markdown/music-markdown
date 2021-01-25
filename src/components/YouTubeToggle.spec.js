import { fireEvent, render } from "@testing-library/react";
import { GlobalStateProvider } from "./GlobalState";
import YouTubeToggle from "./YouTubeToggle";

describe("YouTubeToggle", () => {
  it("renders YouTube button when youTubeId is present", () => {
    const { queryByRole } = render(
      <GlobalStateProvider>
        <YouTubeToggle youTubeId="abcd" />
      </GlobalStateProvider>
    );
    const youTubeButton = queryByRole("button");
    expect(youTubeButton).toBeInTheDocument();
  });

  it("doest not render YouTube button when youTubeId is not present", () => {
    const { queryByRole } = render(
      <GlobalStateProvider>
        <YouTubeToggle />
      </GlobalStateProvider>
    );
    const youTubeButton = queryByRole("button");
    expect(youTubeButton).not.toBeInTheDocument();
  });

  it("renders YouTube iframe when YouTube button clicked", () => {
    const { getByRole, queryByTitle } = render(
      <GlobalStateProvider>
        <YouTubeToggle youTubeId="abcd" />
      </GlobalStateProvider>
    );
    expect(queryByTitle("YouTube")).not.toBeInTheDocument();
    fireEvent.click(getByRole("button"));
    expect(queryByTitle("YouTube")).toBeInTheDocument();
  });
});
