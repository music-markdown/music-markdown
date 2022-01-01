import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { GitHubApiProvider } from "../context/GitHubApiProvider";
import { ReposProvider } from "../context/ReposProvider";
import SnackbarProvider from "../context/SnackbarProvider";
import { ThemeProvider } from "../context/ThemeProvider";
import { YouTubeIdProvider } from "../context/YouTubeIdProvider";
import { REPO_REGEX } from "../lib/constants";
import AppBar from "./AppBar";
import BranchViewer from "./BranchView";
import FileViewer from "./FileView";
import Edit from "./MusicMd/Edit";
import View from "./MusicMd/View";
import RepoViewer from "./RepoView";
import Sandbox from "./Sandbox.js";

const App = () => (
  <YouTubeIdProvider>
    <GitHubApiProvider>
      <ReposProvider>
        <ThemeProvider>
          <SnackbarProvider>
            <HomeRouter />
          </SnackbarProvider>
        </ThemeProvider>
      </ReposProvider>
    </GitHubApiProvider>
  </YouTubeIdProvider>
);

const HomeRouter = () => (
  <Router key="home-router">
    <Route component={AppBar} />
    <Switch>
      <Route path={`${REPO_REGEX}/viewer/:branch/:path+`} component={View} />
      <Route
        path={`${REPO_REGEX}/browser/:branch/:path*`}
        component={FileViewer}
      />
      <Route path={`${REPO_REGEX}/editor/:branch/:path*`} component={Edit} />
      <Route path={REPO_REGEX} component={BranchViewer} />
      <Route path="/sandbox" component={Sandbox} />
      <Route path="/" component={RepoViewer} />
    </Switch>
  </Router>
);

export default App;
