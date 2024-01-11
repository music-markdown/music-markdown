import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GitHubApiProvider } from "../context/GitHubApiProvider";
import { ReposProvider } from "../context/ReposProvider";
import { SnackbarProvider } from "../context/SnackbarProvider";
import { SongPrefsProvider } from "../context/SongPrefsProvider";
import { ThemeProvider } from "../context/ThemeProvider";
import { YouTubeIdProvider } from "../context/YouTubeIdProvider";
import { REPO_REGEX } from "../lib/constants";
import AppBar from "./AppBar";
import BranchViewer from "./BranchView";
import FileViewer from "./FileView";
import Edit from "./MusicMd/Edit";
import View from "./MusicMd/View";
import RepoViewer from "./RepoView";

const App = () => (
  <YouTubeIdProvider>
    <SongPrefsProvider>
      <GitHubApiProvider>
        <ReposProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <HomeRouter />
            </SnackbarProvider>
          </ThemeProvider>
        </ReposProvider>
      </GitHubApiProvider>
    </SongPrefsProvider>
  </YouTubeIdProvider>
);

const HomeRouter = () => (
  <Router key="home-router">
    <Route>
      <AppBar />
    </Route>
    <Switch>
      <Route path={`${REPO_REGEX}/viewer/:branch/:path+`}>
        <View />
      </Route>
      <Route path={`${REPO_REGEX}/browser/:branch/:path*`}>
        <FileViewer />
      </Route>
      <Route path={`${REPO_REGEX}/editor/:branch/:path*`}>
        <Edit />
      </Route>
      <Route path={REPO_REGEX}>
        <BranchViewer />
      </Route>
      <Route path="/">
        <RepoViewer />
      </Route>
    </Switch>
  </Router>
);

export default App;
