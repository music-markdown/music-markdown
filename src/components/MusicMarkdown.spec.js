import MusicMarkdown from './MusicMarkdown';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../redux/store';

describe('MusicMarkdown', () => {
  it('renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}>
        <MusicMarkdown source='' />
      </Provider>, document.createElement('div'));
  });
});
