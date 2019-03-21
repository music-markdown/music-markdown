import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const NavigationListItem = ({ to, itemName }) => (
  <ListItem button component={Link} to={to}>
    <ListItemText primary={itemName}></ListItemText>
  </ListItem>
);

export default NavigationListItem;
