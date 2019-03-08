import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownMusicSourceFetcher from './MarkdownMusicSourceFetcher';
import { BrowserRouter as Router, Route } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Route path='/' exact component={MarkdownMusicSourceFetcher} />
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
