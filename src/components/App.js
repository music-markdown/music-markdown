import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MarkdownMusicSourceFetcher from './MarkdownMusicSourceFetcher';
import MusicMarkdownNavbar from './MusicMarkdownNavbar';
import ResponsiveContainer from './ResponsiveContainer';
import RepositoryNavigation from './RepositoryNavigation';
import BranchNavigation from './BranchNavigation';
import Sandbox from './Sandbox.js';
import store from '../redux/store';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO: Build button toggle for dark/light
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
  },
  reactRouterHoverInherit: {
    '&:hover': {
      color: 'inherit'
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ResponsiveContainer children={[HomeRouter()]} />
  </MuiThemeProvider>
);

const HomeRouter = () => (
  <Provider key="home-provider" store={store}>
    <Router key="home-router">
      <div>
        <Route component={MusicMarkdownNavbar} />
        <Route exact path="/" component={Navigation} />
        <Route excat path='/sandbox' component={Sandbox} />
        <Route exact path='/repos/:owner/:repo' component={BranchNavigation} />
        <Route exact path='/repos/:owner/:repo/:view(viewer)/:branch/:path+' component={MarkdownMusicSourceFetcher} />
        <Route exact path='/repos/:owner/:repo/:view(browser)/:branch/:path*' component={RepositoryNavigation} />
        {/* TODO: Add editor component */}
        <Route exact path='/repos/:owner/:repo/:view(editor)/:branch/:path+' component={Sandbox} />
      </div>
    </Router>
  </Provider>
);

const Navigation = () => (
  <Typography variant='h2'>
    Welcome to Music Markdown!
  </Typography>
);

export default App;
