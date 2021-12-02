import { useEffect, useState } from "react";
import {
  addRepository,
  deleteRepository,
  getRepositories,
} from "../lib/github";

import AddRepository from "./AddRepository";
import Avatar from "@mui/material/Avatar";
import BookIcon from "@mui/icons-material/Book";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 8,
  },
});

export default function RepositoryEditor() {
  const classes = useStyles();
  const [repos, setRepos] = useState([]);
  const reposFingerprint = JSON.stringify(repos);

  useEffect(() => {
    loadRepositories();
  }, [reposFingerprint]);

  const handleAddRepository = async (repo) => {
    await addRepository(repo);
    loadRepositories();
  };

  const handleDeleteRepository = (repo) => {
    deleteRepository(repo);
    loadRepositories();
  };

  const loadRepositories = () => {
    setRepos(getRepositories());
  };

  return (
    <div className={classes.root}>
      <List>
        {repos.map((repo) => (
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
                size="large">
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
