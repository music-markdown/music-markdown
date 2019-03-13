import React from 'react';
import ReactDOM from 'react-dom';
import { YouTubePlayer, YouTubeToggle } from './YouTube';

describe('YouTubePlayer', () => {
  it('renders without youTubeId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<YouTubePlayer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders with youTubeId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<YouTubePlayer youTubeId='abcd' />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('YouTubeToggle', () => {
  it('renders without youTubeId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<YouTubeToggle />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders with youTubeId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<YouTubeToggle youTubeId='abcd' />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
