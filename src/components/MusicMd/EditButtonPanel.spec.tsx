import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { GitHubApiProvider } from "../../context/GitHubApiProvider";
import { REPO_REGEX } from "../../lib/constants";
import EditButtonPanel from "./EditButtonPanel";

describe("EditButtonPanel", () => {
  it("disables all buttons while loading", async () => {
    const format = jest.fn();
    const save = jest.fn();
    const revert = jest.fn();
    localStorage.setItem("gitHubToken", '"token"');

    render(
      <GitHubApiProvider>
        <MemoryRouter initialEntries={["/repos/o/r/editor/b/s.md"]}>
          <Route path={`${REPO_REGEX}/editor/:branch/:path*`} exact>
            <EditButtonPanel
              dirty={false}
              disabled={true}
              format={format}
              saving={false}
              save={save}
              revert={revert}
            />
          </Route>
        </MemoryRouter>
      </GitHubApiProvider>
    );

    expect(screen.getByRole("button", { name: "Format" })).toBeDisabled();
    expect(screen.getByRole("link", { name: "Viewer" })).toHaveAttribute(
      "aria-disabled"
    );
    expect(screen.getByRole("button", { name: "Revert" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("disables save button if not dirty", async () => {
    const format = jest.fn();
    const save = jest.fn();
    const revert = jest.fn();
    localStorage.setItem("gitHubToken", '"token"');

    render(
      <GitHubApiProvider>
        <MemoryRouter initialEntries={["/repos/o/r/editor/b/s.md"]}>
          <Route path={`${REPO_REGEX}/editor/:branch/:path*`} exact>
            <EditButtonPanel
              dirty={false}
              disabled={false}
              format={format}
              saving={false}
              save={save}
              revert={revert}
            />
          </Route>
        </MemoryRouter>
      </GitHubApiProvider>
    );

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("disables save button if dirty and gitHubToken is undefined", async () => {
    const format = jest.fn();
    const save = jest.fn();
    const revert = jest.fn();
    localStorage.clear();

    render(
      <GitHubApiProvider>
        <MemoryRouter initialEntries={["/repos/o/r/editor/b/s.md"]}>
          <Route path={`${REPO_REGEX}/editor/:branch/:path*`} exact>
            <EditButtonPanel
              dirty={true}
              disabled={false}
              format={format}
              saving={false}
              save={save}
              revert={revert}
            />
          </Route>
        </MemoryRouter>
      </GitHubApiProvider>
    );

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("enables save button if dirty and gitHubToken is defined", async () => {
    const format = jest.fn();
    const save = jest.fn();
    const revert = jest.fn();
    localStorage.setItem("gitHubToken", '"token"');

    render(
      <GitHubApiProvider>
        <MemoryRouter initialEntries={["/repos/o/r/editor/b/s.md"]}>
          <Route path={`${REPO_REGEX}/editor/:branch/:path*`} exact>
            <EditButtonPanel
              dirty={true}
              disabled={false}
              format={format}
              saving={false}
              save={save}
              revert={revert}
            />
          </Route>
        </MemoryRouter>
      </GitHubApiProvider>
    );

    expect(screen.getByRole("button", { name: "Save" })).toBeEnabled();
  });

  it("disables save button while saving", async () => {
    const format = jest.fn();
    const save = jest.fn();
    const revert = jest.fn();
    localStorage.setItem("gitHubToken", '"token"');

    render(
      <GitHubApiProvider>
        <MemoryRouter initialEntries={["/repos/o/r/editor/b/s.md"]}>
          <Route path={`${REPO_REGEX}/editor/:branch/:path*`} exact>
            <EditButtonPanel
              dirty={true}
              disabled={false}
              format={format}
              saving={true}
              save={save}
              revert={revert}
            />
          </Route>
        </MemoryRouter>
      </GitHubApiProvider>
    );

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("calls format when format button clicked", async () => {
    const format = jest.fn();
    const save = jest.fn();
    const revert = jest.fn();
    localStorage.setItem("gitHubToken", '"token"');

    render(
      <GitHubApiProvider>
        <MemoryRouter initialEntries={["/repos/o/r/editor/b/s.md"]}>
          <Route path={`${REPO_REGEX}/editor/:branch/:path*`} exact>
            <EditButtonPanel
              dirty={false}
              disabled={false}
              format={format}
              saving={false}
              save={save}
              revert={revert}
            />
          </Route>
        </MemoryRouter>
      </GitHubApiProvider>
    );

    screen.getByRole("button", { name: "Format" }).click();
    expect(format).toHaveBeenCalled();
  });

  it("calls save when save button clicked", async () => {
    const format = jest.fn();
    const save = jest.fn();
    const revert = jest.fn();
    localStorage.setItem("gitHubToken", '"token"');

    render(
      <GitHubApiProvider>
        <MemoryRouter initialEntries={["/repos/o/r/editor/b/s.md"]}>
          <Route path={`${REPO_REGEX}/editor/:branch/:path*`} exact>
            <EditButtonPanel
              dirty={true}
              disabled={false}
              format={format}
              saving={false}
              save={save}
              revert={revert}
            />
          </Route>
        </MemoryRouter>
      </GitHubApiProvider>
    );

    screen.getByRole("button", { name: "Save" }).click();
    expect(save).toHaveBeenCalled();
  });

  it("calls revert when revert button clicked", async () => {
    const format = jest.fn();
    const save = jest.fn();
    const revert = jest.fn();
    localStorage.setItem("gitHubToken", '"token"');

    render(
      <GitHubApiProvider>
        <MemoryRouter initialEntries={["/repos/o/r/editor/b/s.md"]}>
          <Route path={`${REPO_REGEX}/editor/:branch/:path*`} exact>
            <EditButtonPanel
              dirty={true}
              disabled={false}
              format={format}
              saving={false}
              save={save}
              revert={revert}
            />
          </Route>
        </MemoryRouter>
      </GitHubApiProvider>
    );

    screen.getByRole("button", { name: "Revert" }).click();
    expect(revert).toHaveBeenCalled();
  });
});
