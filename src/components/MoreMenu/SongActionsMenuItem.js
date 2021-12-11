import { Button, Stack, Typography } from "@mui/material";
import { useHistory, useParams } from "react-router";

import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GitHubIcon from "@mui/icons-material/GitHub";

const EditViewButton = ({ close }) => {
  const history = useHistory();
  const { repo, mode, branch, path } = useParams();

  const edit = () => {
    close();
    history.push(`/repos/${repo}/editor/${branch}/${path}`);
  };

  const view = () => {
    close();
    history.push(`/repos/${repo}/viewer/${branch}/${path}`);
  };

  if (mode === "viewer") {
    return (
      <Button variant="outlined" startIcon={<EditIcon />} onClick={edit}>
        Edit inline
      </Button>
    );
  }
  if (mode === "editor") {
    return (
      <Button variant="outlined" startIcon={<ExitToAppIcon />} onClick={view}>
        Exit to viewer
      </Button>
    );
  }
  return null;
};

const ShowOnGitHubButton = () => {
  const { repo, branch, path } = useParams();
  const githubLink = `https://github.com/${repo}/blob/${branch}/${path}`;

  return (
    <Button href={githubLink} variant="outlined" startIcon={<GitHubIcon />}>
      Show on GitHub
    </Button>
  );
};

export default function SongActionsMenuItem({ close }) {
  return (
    <Box>
      <Typography variant="subtitle1">Song Actions</Typography>
      <Stack direction="column" spacing={1}>
        <EditViewButton close={close} />
        <ShowOnGitHubButton />
      </Stack>
    </Box>
  );
}
