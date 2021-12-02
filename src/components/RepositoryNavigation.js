import { useEffect, useState } from "react";

import AddNewFile from "./AddNewFile";
import Avatar from "@mui/material/Avatar";
import DescriptionIcon from "@mui/icons-material/Description";
import DirectoryBreadcrumbs from "./RouterBreadcrumbs";
import FolderIcon from "@mui/icons-material/Folder";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { getContents } from "../lib/github";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 8,
  },
});

/**
 * Sorts the contents of a GitHub directory. Lists directories first then files,
 * each in alphabetical order.
 * @param {Object[]} contents GitHub directory contents. Contains files and directories.
 */
function sortDir(contents) {
  contents.sort((a, b) => {
    if (a.type === "file") {
      if (b.type === "file") {
        return a.name - b.name;
      }
      return 1;
    }
    if (b.type === "file") {
      return -1;
    }
    return a.name - b.name;
  });
}

/**
 * A React component for rendering repository files and directories.
 */
export default function RepositoryNavigation({ match, location }) {
  const classes = useStyles();
  const [contents, setContents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchContents() {
      const { repo, path, branch } = match.params;

      const contents = await getContents(repo, path, branch);
      sortDir(contents);
      setContents(contents);
      setIsLoaded(true);
    }
    fetchContents();
  }, [match.params]);

  const { repo, branch } = match.params;

  if (!isLoaded) {
    return <LinearProgress />;
  }

  return (
    <>
      <DirectoryBreadcrumbs pathname={location.pathname} />
      <div className={classes.root}>
        <List key={"repo-navigation-list"}>
          {contents.map((item) => (
            <ListItem
              button
              component={Link}
              key={`list-group-item-${item.name}`}
              to={
                item.type === "dir"
                  ? `/repos/${repo}/browser/${branch}/${item.path}/`
                  : `/repos/${repo}/viewer/${branch}/${item.path}`
              }
            >
              <ListItemAvatar>
                <Avatar>
                  {item.type === "dir" ? <FolderIcon /> : <DescriptionIcon />}
                </Avatar>
              </ListItemAvatar>
              {item.type === "dir" ? (
                <ListItemText secondary={item.name}></ListItemText>
              ) : (
                <ListItemText primary={item.name}></ListItemText>
              )}
            </ListItem>
          ))}
        </List>
        <AddNewFile location={location} match={match} />
      </div>
    </>
  );
}
