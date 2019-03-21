import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NavigationListItem = ({ to, itemName }) => (
  <ListItem button component={Link} to={to}>
    <ListItemText primary={itemName}></ListItemText>
  </ListItem>
);

export default NavigationListItem;
