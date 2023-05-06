import styled from "@emotion/styled";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Link, useParams } from "react-router-dom";
import { useContents } from "../../context/GitHubApiProvider";
import DirectoryBreadcrumbs from "../DirectoryBreadcrumbs";
import AddNewFile from "./AddNewFile";

const DivRoot = styled("div")({
  flexGrow: 1,
  padding: 8,
});

/**
 * Sorts the contents of a GitHub directory. Lists directories first then files,
 * each in alphabetical order.
 * @param {Object[]} contents GitHub directory contents. Contains files and directories.
 */
function sortDir(contents) {
  return [...contents].sort((a, b) => {
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
export default function FileViewer() {
  const { repo, path, branch } = useParams();
  const { loading, value } = useContents(repo, path, branch);

  if (loading) {
    return <LinearProgress />;
  }

  const contents = sortDir(value);

  return (
    <>
      <DirectoryBreadcrumbs />
      <DivRoot>
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
        <AddNewFile />
      </DivRoot>
    </>
  );
}
