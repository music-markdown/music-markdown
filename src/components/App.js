import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';

import MarkdownMusicSourceFetcher from './MarkdownMusicSourceFetcher';
import MusicMarkdownNavbar from './MusicMarkdownNavbar';
import ResponsiveContainer from './ResponsiveContainer';
import RepositoryNavigation from './RepositoryNavigation';
import Sandbox from './Sandbox.js';
import { REPO_RESOURCE, RENDER_RESOURCE, SANDBOX_RESOURCE } from '../lib/constants';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <ResponsiveContainer children={[HomeRouter()]} />
);

const HomeRouter = () => (
  <Provider key="home-provider" store={store}>
    <Router key="home-router">
      <div>
        <Route component={MusicMarkdownNavbar} />
        <Route exact path="/" component={Navigation} />
        <Route exact path={REPO_RESOURCE} component={RepositoryNavigation} />
        <Route path={SANDBOX_RESOURCE} component={Sandbox} />
        <Route path={RENDER_RESOURCE} component={MarkdownMusicSourceFetcher} />
      </div>
    </Router>
  </Provider>
);

const Navigation = () => (
  <h1>Welcome to Music Markdown!</h1>
);

export default App;
