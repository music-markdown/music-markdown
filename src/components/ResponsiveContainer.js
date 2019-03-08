import Container from '../../node_modules/react-bootstrap/Container.js';
import React from 'react';

const RESPONSIVE_CONTAINER_KEY = 'app-container';

function ResponsiveContainer(props) {
  return (
    <Container key={RESPONSIVE_CONTAINER_KEY}>
      {props.children}
    </Container>
  );
}

export default ResponsiveContainer;
