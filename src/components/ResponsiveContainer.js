import Container from '../../node_modules/react-bootstrap/Container.js';
import React from 'react';

function ResponsiveContainer(props) {
  return (
    <Container>{props.childElement}</Container>
  );
}

export default ResponsiveContainer;
