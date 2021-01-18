import { GlobalStateProvider } from "./GlobalState";
import RepositoryEditor from "./RepositoryEditor";
import { render } from "@testing-library/react";

describe("RepositoryEditor", () => {
  it("renders without crashing", () => {
    render(
      <GlobalStateProvider>
        <RepositoryEditor />
      </GlobalStateProvider>
    );
  });
});
