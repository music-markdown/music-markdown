import React from 'react';
import ReactDOM from 'react-dom';
import ResponsiveContainer from './ResponsiveContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Route path='/' exact component={ResponsiveContainer} />
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
