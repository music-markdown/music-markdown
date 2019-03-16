import React from 'react';
import ReactDOM from 'react-dom';
import Breadcrumbs from './Breadcrumbs';
import { BrowserRouter as Router, Route } from 'react-router-dom';

describe('Breadcrumbs', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <Route
          path='/'
          exact
          render={(props) => <Breadcrumbs {...props} pathname={'/test/path'} />}/>
      </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
