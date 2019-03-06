import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import MarkdownMusicSourceFetcher from './MarkdownMusicSourceFetcher';
import ResponsiveContainer from './ResponsiveContainer.js';
import Sandbox from './Sandbox.js';
import './App.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <ResponsiveContainer children={[HomeRouter()]} />
);

const HomeRouter = () => (
  <Router key="home-router">
    <div>
      <Route exact path="/" component={Navigation} />
      <Route path="/sandbox" component={Sandbox} />
      <Route path="/repos/:owner/:repo/contents/:path" component={MarkdownMusicSourceFetcher} />
    </div>
  </Router>
);

const Navigation = () => (
  <div>
    <Link to="/repos/music-markdown/almost-in-time/contents/California Dreamin' - The Mamas and the Papas.md">
      California Dreamin
    </Link>
  </div>
);

export default App;
