import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import { REPO_REGEX } from "../../lib/constants";
import SongActionsMenuItem from "./SongActionsMenuItem";

describe("SongActionsMenuItem", () => {
  it("renders edit button when on viewer page", () => {
    const mockHandleClose = jest.fn();

    const { queryByText } = render(
      <MemoryRouter initialEntries={["/repos/o/r/viewer/b/song.md"]}>
        <Route
          path={`${REPO_REGEX}/:mode/:branch/:path*`}
          render={() => <SongActionsMenuItem close={mockHandleClose} />}
        />
      </MemoryRouter>
    );

    expect(queryByText("Edit inline")).toBeInTheDocument();
  });

  it("renders exit button when on editor page", () => {
    const mockHandleClose = jest.fn();

    const { queryByText } = render(
      <MemoryRouter initialEntries={["/repos/o/r/editor/b/song.md"]}>
        <Route
          path={`${REPO_REGEX}/:mode/:branch/:path*`}
          render={() => <SongActionsMenuItem close={mockHandleClose} />}
        />
      </MemoryRouter>
    );

    expect(queryByText("Exit to viewer")).toBeInTheDocument();
  });
});
