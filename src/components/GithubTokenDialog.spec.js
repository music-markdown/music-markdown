import GithubTokenDialog from "./GithubTokenDialog";
import { GlobalStateProvider } from "./GlobalState";
import { render } from "@testing-library/react";

describe("GithubTokenDialog", () => {
  it("renders without crashing", () => {
    render(
      <GlobalStateProvider>
        <GithubTokenDialog open={true} handleClose={() => false} />
      </GlobalStateProvider>
    );
  });
});
