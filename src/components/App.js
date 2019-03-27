import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import MarkdownMusicSourceFetcher from './MarkdownMusicSourceFetcher';
import MusicMarkdownNavbar from './MusicMarkdownNavbar';
import ResponsiveContainer from './ResponsiveContainer';
import RepositoryEditor from './RepositoryEditor';
import RepositoryNavigation from './RepositoryNavigation';
import BranchNavigation from './BranchNavigation';
import Sandbox from './Sandbox.js';
import store from '../redux/store';
import './App.scss';

const REPO_REGEX = '/repos/:repo([^/]+/[^/]+)';
const App = () => (
  <Provider key="home-provider" store={store}>
    <ThemeProvider />
  </Provider>
);

function mapStateToProps(state) {
  const { theme } = state;
  return { theme };
}

const ThemeProvider = connect(mapStateToProps)(({ theme }) => (
  <MuiThemeProvider theme={createMuiTheme(theme)}>
    <CssBaseline />
    <ResponsiveContainer children={[HomeRouter()]} />
  </MuiThemeProvider>
));

const HomeRouter = () => (
  <Provider key="home-provider" store={store}>
    <Router key="home-router">
      <>
        <Route component={MusicMarkdownNavbar} />
        <Switch>
          <Route exact path="/" component={Navigation} />
          <Route path={`${REPO_REGEX}/viewer/:branch/:path+`} component={MarkdownMusicSourceFetcher} />
          <Route path={`${REPO_REGEX}/browser/:branch/:path*`} component={RepositoryNavigation} />
          {/* TODO: Add editor component */}
          <Route path={`${REPO_REGEX}/editor/:branch/:path+`} component={Sandbox} />
          <Route path={REPO_REGEX} component={BranchNavigation} />
          <Route path='/repos' component={RepositoryEditor} />
          <Route path='/sandbox' component={Sandbox} />
        </Switch>
      </>
    </Router>
  </Provider>
);

const Navigation = () => (
  <Typography variant='h2'>
    Welcome to Music Markdown!
  </Typography>
);

export default App;
