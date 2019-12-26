import React, { useEffect, useState } from "react";
import {
  addRepository,
  deleteRepository,
  getRepositories
} from "../lib/github";

import AddRepository from "./AddRepository";
import Avatar from "@material-ui/core/Avatar";
import BookIcon from "@material-ui/icons/Book";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 8
  }
});

export default function RepositoryEditor() {
  const classes = useStyles();
  const [repos, setRepos] = useState([]);
  const reposFingerprint = JSON.stringify(repos);

  useEffect(() => {
    loadRepositories();
  }, [reposFingerprint]);

  const handleAddRepository = async repo => {
    await addRepository(repo);
    loadRepositories();
  };

  const handleDeleteRepository = repo => {
    deleteRepository(repo);
    loadRepositories();
  };

  const loadRepositories = () => {
    setRepos(getRepositories());
  };

  return (
    <div className={classes.root}>
      <List>
        {repos.map(repo => (
          <ListItem
            button
            key={`repo-item-${repo}`}
            component={Link}
            to={`/repos/${repo}/`}
          >
            <ListItemAvatar>
              <Avatar>
                <BookIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={repo} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={() => handleDeleteRepository(repo)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <AddRepository handleAddRepository={handleAddRepository} />
    </div>
  );
}
