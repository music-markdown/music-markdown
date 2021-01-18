import { Route, BrowserRouter as Router } from "react-router-dom";
import AddRepository from "./AddRepository";
import { GlobalStateProvider } from "./GlobalState";
import { render } from "@testing-library/react";

describe("AddRepository", () => {
  it("renders without crashing", () => {
    render(
      <GlobalStateProvider>
        <AddRepository handleAddRepository={() => true} />
      </GlobalStateProvider>
    );
  });
});
