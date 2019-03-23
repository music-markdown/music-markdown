import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton } from '@material-ui/core';
import { Book, Delete } from '@material-ui/icons';
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
          <ListItem button key={`repo-item-${repo}`}>
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
