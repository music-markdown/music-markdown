import { YouTubePlayer, YouTubeToggle } from './YouTube';
import { GlobalStateProvider } from './GlobalState';
import React from 'react';
import ReactDOM from 'react-dom';

describe('YouTubePlayer', () => {
  it('renders without youTubeId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GlobalStateProvider><YouTubePlayer /></GlobalStateProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders with youTubeId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GlobalStateProvider><YouTubePlayer youTubeId='abcd' /></GlobalStateProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('YouTubeToggle', () => {
  it('renders without youTubeId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GlobalStateProvider><YouTubeToggle /></GlobalStateProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders with youTubeId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GlobalStateProvider><YouTubeToggle youTubeId='abcd' /></GlobalStateProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
