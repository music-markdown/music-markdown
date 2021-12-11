import { GlobalStateProvider, useTheme } from "./GlobalState";
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import { Route, HashRouter as Router, Switch } from "react-router-dom";

import AppBar from "./AppBar";
import BranchNavigation from "./BranchNavigation";
import CssBaseline from "@mui/material/CssBaseline";
import MarkdownEditor from "./MarkdownEditor";
import MarkdownViewer from "./MarkdownViewer";
import { REPO_REGEX } from "../lib/constants";
import RepositoryEditor from "./RepositoryEditor";
import RepositoryNavigation from "./RepositoryNavigation";
import ResponsiveContainer from "./ResponsiveContainer";
import Sandbox from "./Sandbox.js";

const App = () => (
  <GlobalStateProvider>
    <ThemeProvider />
  </GlobalStateProvider>
);

const ThemeProvider = () => {
  const { getTheme } = useTheme();

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={createTheme(getTheme())}>
        <CssBaseline />
        <ResponsiveContainer>{[HomeRouter()]}</ResponsiveContainer>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

const HomeRouter = () => (
  <Router key="home-router">
    <Route component={AppBar} />
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
  </Router>
);

export default App;
