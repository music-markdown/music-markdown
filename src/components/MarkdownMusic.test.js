import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import MarkdownMusic from './MarkdownMusic';

describe('MarkdownMusic', () => {
  it('renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}>
        <MarkdownMusic source='' />
      </Provider>, document.createElement('div'));
  });
});
