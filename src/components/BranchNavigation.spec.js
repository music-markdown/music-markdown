import React from 'react';
import ReactDOM from 'react-dom';
import BranchNavigation from './BranchNavigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';

describe('BranchNavigation', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <Route path='/' exact component={BranchNavigation} />
      </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
