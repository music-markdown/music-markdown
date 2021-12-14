import BookIcon from "@mui/icons-material/Book";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import { useRepoMetadata, useRepos } from "../../context/ReposProvider";
import AddRepository from "./AddRepository";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 8,
  },
});

export default function RepoViewer() {
  const classes = useStyles();
  const repoMetadata = useRepoMetadata();
  const { addRepo, deleteRepo } = useRepos();

  return (
    <div className={classes.root}>
      <List>
        {repoMetadata.map((repo) => (
          <ListItem
            button
            key={`repo-item-${repo.full_name}`}
            component={Link}
            to={`/repos/${repo.full_name}/browser/${repo.default_branch}`}
          >
            <ListItemAvatar>
              <Avatar>
                <BookIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={repo.full_name} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={() => deleteRepo(repo.full_name)}
                size="large"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <AddRepository handleAddRepository={addRepo} />
    </div>
  );
}
