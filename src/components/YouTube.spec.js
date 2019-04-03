import { YouTubePlayer, YouTubeToggle } from './YouTube';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../redux/store';

describe('YouTubePlayer', () => {
  it('renders without youTubeId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><YouTubePlayer /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders with youTubeId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><YouTubePlayer youTubeId='abcd' /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('YouTubeToggle', () => {
  it('renders without youTubeId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><YouTubeToggle /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders with youTubeId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><YouTubeToggle youTubeId='abcd' /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
