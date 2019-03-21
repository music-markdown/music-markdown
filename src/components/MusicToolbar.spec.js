import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MusicToolbar from './MusicToolbar';

describe('MusicToolbar', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Route path='/' exact component={MusicToolbar} />
        </Router>
      </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
