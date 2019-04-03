import { Route, BrowserRouter as Router } from 'react-router-dom';
import AddRepository from './AddRepository';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../redux/store';

describe('AddRepository', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Route path='/' exact component={AddRepository} />
        </Router>
      </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
