import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Book from '@material-ui/icons/Book';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Link from 'react-router-dom/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddRepository from './AddRepository';
import { getRepositories, deleteRepository, addRepository } from '../lib/github';


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

  render = () => (
    <>
      <List>
        {this.state.repos.map((repo) => (
          <ListItem button key={`repo-item-${repo}`} component={Link} to={`/repos/${repo}`}>
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
    </>
  );
}

const RepositoryEditor = () => (
  <ListRepositories />
);

export default RepositoryEditor;
