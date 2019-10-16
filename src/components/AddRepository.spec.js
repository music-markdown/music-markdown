import { Route, BrowserRouter as Router } from 'react-router-dom';
import AddRepository from './AddRepository';
import { GlobalStateProvider } from './GlobalState';
import React from 'react';
import ReactDOM from 'react-dom';

describe('AddRepository', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <GlobalStateProvider>
        <Router>
          <Route path='/' exact component={AddRepository} />
        </Router>
      </GlobalStateProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
