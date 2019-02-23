import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App.js';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
