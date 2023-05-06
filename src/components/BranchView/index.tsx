import styled from "@emotion/styled";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useBranches } from "../../context/GitHubApiProvider";
import { useRouteParams } from "../../lib/hooks";
import DirectoryBreadcrumbs from "../DirectoryBreadcrumbs";

const DivRoot = styled("div")({
  flexGrow: 1,
  padding: 8,
});

/**
 * A React component for rendering repository items when navigating the /repos resource
 */
export default function BranchViewer() {
  const { repo } = useRouteParams();
  const { loading, value: branches } = useBranches(repo);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <>
      <DirectoryBreadcrumbs />
      <DivRoot>
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
      </DivRoot>
    </>
  );
}
