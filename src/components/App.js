import './App.scss';
import { Provider, connect } from 'react-redux';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import BranchNavigation from './BranchNavigation';
import CssBaseline from '@material-ui/core/CssBaseline';
import MarkdownEditor from './MarkdownEditor';
import MarkdownViewer from './MarkdownViewer';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import MusicMarkdownNavbar from './MusicMarkdownNavbar';
import React from 'react';
import RepositoryEditor from './RepositoryEditor';
import RepositoryNavigation from './RepositoryNavigation';
import ResponsiveContainer from './ResponsiveContainer';
import Sandbox from './Sandbox.js';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import store from '../redux/store';

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
          <Route path={`${REPO_REGEX}/viewer/:branch/:path+`} component={MarkdownViewer} />
          <Route path={`${REPO_REGEX}/browser/:branch/:path*`} component={RepositoryNavigation} />
          <Route path={`${REPO_REGEX}/editor/:branch/:path+`} component={MarkdownEditor} />
          <Route path={REPO_REGEX} component={BranchNavigation} />
          <Route path='/sandbox' component={Sandbox} />
          <Route path='/' component={RepositoryEditor} />
        </Switch>
      </>
    </Router>
  </Provider>
);

export default App;
