import "./App.scss";
import { GlobalStateProvider, useGlobalStateContext } from "./GlobalState";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import BranchNavigation from "./BranchNavigation";
import CssBaseline from "@material-ui/core/CssBaseline";
import MarkdownEditor from "./MarkdownEditor";
import MarkdownViewer from "./MarkdownViewer";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MusicMarkdownNavbar from "./MusicMarkdownNavbar";
import { REPO_REGEX } from "../lib/constants";
import React from "react";
import RepositoryEditor from "./RepositoryEditor";
import RepositoryNavigation from "./RepositoryNavigation";
import ResponsiveContainer from "./ResponsiveContainer";
import Sandbox from "./Sandbox.js";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const App = () => (
  <GlobalStateProvider>
    <ThemeProvider />
  </GlobalStateProvider>
);

const ThemeProvider = () => {
  const context = useGlobalStateContext();

  return (
    <MuiThemeProvider theme={createMuiTheme(context.data.theme)}>
      <CssBaseline />
      <ResponsiveContainer>{[HomeRouter()]}</ResponsiveContainer>
    </MuiThemeProvider>
  );
};

const HomeRouter = () => (
  <Router key="home-router">
    <>
      <Route component={MusicMarkdownNavbar} />
      <Switch>
        <Route
          path={`${REPO_REGEX}/viewer/:branch/:path+`}
          component={MarkdownViewer}
        />
        <Route
          path={`${REPO_REGEX}/browser/:branch/:path*`}
          component={RepositoryNavigation}
        />
        <Route
          path={`${REPO_REGEX}/editor/:branch/:path*`}
          component={MarkdownEditor}
        />
        <Route path={REPO_REGEX} component={BranchNavigation} />
        <Route path="/sandbox" component={Sandbox} />
        <Route path="/" component={RepositoryEditor} />
      </Switch>
    </>
  </Router>
);

export default App;
