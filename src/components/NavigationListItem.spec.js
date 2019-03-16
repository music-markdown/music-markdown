import React from 'react';
import ReactDOM from 'react-dom';
import NavigationListItem from './NavigationListItem';
import { BrowserRouter as Router, Route } from 'react-router-dom';

describe('NavigationListItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <Route
          path='/'
          exact
          render={(props) => <NavigationListItem {...props} to={'/test'} />} />
      </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
