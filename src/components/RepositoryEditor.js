import { addRepository, deleteRepository, getRepositories } from '../lib/github';

import AddRepository from './AddRepository';
import Avatar from '@material-ui/core/Avatar';
import Book from '@material-ui/icons/Book';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { REPOS_RESOURCE } from '../lib/constants';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  root: {
    flexGrow: 1,
    padding: 8,
  },
});

class ListRepositories extends React.Component {
  state = {
    repos: [],
  }

  handleAddRepository = async (repo) => {
    await addRepository(repo);
    this.loadRepositories();
  }

  handleDeleteRepository = (repo) => {
    deleteRepository(repo);
    this.loadRepositories();
  }

  loadRepositories = () => {
    this.setState({
      repos: getRepositories()
    });
  }

  componentDidMount = () => {
    this.loadRepositories();
  }

  render = () => {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List>
          {this.state.repos.map((repo) => (
            <ListItem button key={`repo-item-${repo}`} component={Link} to={`/${REPOS_RESOURCE}/${repo}/branches`}>
              <ListItemAvatar>
                <Avatar>
                  <Book />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={repo} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={() => this.handleDeleteRepository(repo)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <AddRepository handleAddRepository={this.handleAddRepository} />
      </div>
    );
  }
}

const RepositoryEditor = ({ classes }) => (
  <ListRepositories classes={classes} />
);

export default withStyles(styles)(RepositoryEditor);
