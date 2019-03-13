import React from 'react';
import ReactDOM from 'react-dom';
import RepositoryNavigation from './RepositoryNavigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Route path='/' exact component={RepositoryNavigation} />
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
