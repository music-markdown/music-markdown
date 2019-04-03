import { Route, BrowserRouter as Router } from 'react-router-dom';
import MarkdownEditor from './MarkdownEditor';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../redux/store';

describe('MarkdownEditor', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Route path='/' exact component={MarkdownEditor} />
        </Router>
      </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
