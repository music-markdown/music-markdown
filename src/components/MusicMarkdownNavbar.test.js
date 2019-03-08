import React from 'react';
import ReactDOM from 'react-dom';
import MusicMarkdownNavbar from './MusicMarkdownNavbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Route path='/' exact component={MusicMarkdownNavbar} />
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
