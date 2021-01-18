import { useEffect, useState } from "react";

import AddNewFile from "./AddNewFile";
import Avatar from "@material-ui/core/Avatar";
import DescriptionIcon from "@material-ui/icons/Description";
import DirectoryBreadcrumbs from "./RouterBreadcrumbs";
import FolderIcon from "@material-ui/icons/Folder";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { getContents } from "../lib/github";
import { makeStyles } from "@material-ui/core/styles";

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
