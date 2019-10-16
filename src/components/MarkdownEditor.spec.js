import { Route, BrowserRouter as Router } from 'react-router-dom';
import { GlobalStateProvider } from './GlobalState';
import MarkdownEditor from './MarkdownEditor';
import React from 'react';
import ReactDOM from 'react-dom';

describe('MarkdownEditor', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <GlobalStateProvider>
        <Router>
          <Route path='/' exact component={MarkdownEditor} />
        </Router>
      </GlobalStateProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
