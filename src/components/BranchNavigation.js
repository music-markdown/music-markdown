import React, { useEffect, useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import DirectoryBreadcrumbs from "./RouterBreadcrumbs";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { getBranches } from "../lib/github";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 8
  }
});

/**
 * A React component for rendering repository items when navigating the /repos resource
 */
export default function BranchNavigation({ location, match }) {
  const classes = useStyles();
  const [branches, setBranches] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchBranches() {
      const branches = await getBranches(match.params.repo);
      setBranches(branches);
      setIsLoaded(true);
    }
    fetchBranches();
  }, [match.params.repo]);

  if (!isLoaded) {
    return <LinearProgress />;
  }

  return (
    <>
      <DirectoryBreadcrumbs pathname={location.pathname} />
      <div className={classes.root}>
        <List>
          {branches.map(item => (
            <ListItem
              button
              component={Link}
              key={`list-group-item-${item.name}`}
              to={`/repos/${match.params.repo}/browser/${item.name}/`}
            >
              <ListItemAvatar>
                <Avatar>
                  <CallSplitIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name}></ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}
