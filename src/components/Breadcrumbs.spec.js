import React from 'react';
import ReactDOM from 'react-dom';
import RouterBreadcrumbs from './RouterBreadcrumbs';
import { BrowserRouter as Router, Route } from 'react-router-dom';

describe('RouterBreadcrumbs', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <Route
          path='/'
          exact
          render={(props) => <RouterBreadcrumbs {...props} pathname={'/test/path'} />}/>
      </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
