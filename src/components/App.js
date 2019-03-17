import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';

import MarkdownMusicSourceFetcher from './MarkdownMusicSourceFetcher';
import MusicMarkdownNavbar from './MusicMarkdownNavbar';
import ResponsiveContainer from './ResponsiveContainer';
import RepositoryNavigation from './RepositoryNavigation';
import BranchNavigation from './BranchNavigation';
import Sandbox from './Sandbox.js';
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
  <h1>Welcome to Music Markdown!</h1>
);

export default App;
