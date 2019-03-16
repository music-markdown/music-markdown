import React from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { LinkContainer } from 'react-router-bootstrap';

const NavigationListItem = ({ to, action, item }) => (
  <LinkContainer to={to}>
    <ListGroupItem action={action}>
      {item}
    </ListGroupItem>
  </LinkContainer>
);

export default NavigationListItem;
