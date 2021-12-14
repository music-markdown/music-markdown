import CallSplitIcon from "@mui/icons-material/CallSplit";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import makeStyles from "@mui/styles/makeStyles";
import { Link, useParams } from "react-router-dom";
import { useGitHubFetch } from "../../context/GitHubApiProvider";
import DirectoryBreadcrumbs from "../RouterBreadcrumbs";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 8,
  },
});

/**
 * A React component for rendering repository items when navigating the /repos resource
 */
export default function BranchViewer({ location }) {
  const classes = useStyles();
  const { repo } = useParams();
  const { loading, value: branches } = useGitHubFetch(
    `/repos/${repo}/branches`
  );

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <>
      <DirectoryBreadcrumbs pathname={location.pathname} />
      <div className={classes.root}>
        <List>
          {branches.map((item) => (
            <ListItem
              button
              component={Link}
              key={`list-group-item-${item.name}`}
              to={`/repos/${repo}/browser/${item.name}/`}
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
