import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import MarkdownMusicSourceFetcher from './MarkdownItRender.js';
import ResponsiveContainer from './ResponsiveContainer.js';
import './App.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ResponsiveContainer childElement={homeRouter()} />
  );
};

const homeRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={navigation} />
      <Route path="/repos/:owner/:repo/contents/:path" component={MarkdownMusicSourceFetcher} />
    </div>
  </Router>
);

const navigation = () => (
  <div>
    <h2>Home</h2>
    <Link to="/repos/music-markdown/almost-in-time/contents/California Dreamin' - The Mamas and the Papas.md">
      California Dreamin
    </Link>
  </div>
);

export default App;
