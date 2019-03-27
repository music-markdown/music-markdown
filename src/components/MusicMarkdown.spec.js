import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import MusicMarkdown from './MusicMarkdown';

describe('MusicMarkdown', () => {
  it('renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}>
        <MusicMarkdown source='' />
      </Provider>, document.createElement('div'));
  });
});
