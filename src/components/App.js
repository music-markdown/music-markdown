import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import MarkdownMusicSourceFetcher from './MarkdownMusicSourceFetcher';
import MusicMarkdownNavbar from './MusicMarkdownNavbar.js';
import ResponsiveContainer from './ResponsiveContainer.js';
import Sandbox from './Sandbox.js';
import store from '../redux/store';

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
        <Route path="/sandbox" component={Sandbox} />
        <Route path="/repos/:owner/:repo/contents/:path" component={MarkdownMusicSourceFetcher} />
      </div>
    </Router>
  </Provider>
);

const Navigation = () => (
  <div>
    <Link to="/repos/music-markdown/almost-in-time/contents/California Dreamin' - The Mamas and the Papas.md">
      California Dreamin
    </Link>
  </div>
);

export default App;
