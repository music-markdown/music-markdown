import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import ShareIcon from "@mui/icons-material/Share";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory, useParams } from "react-router";
import { useSnackbar } from "../../context/SnackbarProvider";

const ShareButton = ({ close }) => {
  const { showSnackbar } = useSnackbar();

  const share = () => {
    navigator.clipboard.writeText(window.location.href);
    showSnackbar("Song URL copied to the clipboard!");
    close();
  };

  return (
    <Button variant="outlined" startIcon={<ShareIcon />} onClick={share}>
      Share song URL
    </Button>
  );
};

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

const SongListButton = ({ close }) => {
  const history = useHistory();
  const { repo, branch, path } = useParams();
  const folder = path.split("/").slice(0, -1).join("/");

  const back = () => {
    close();
    history.push(`/repos/${repo}/browser/${branch}/${folder}`);
  };

  return (
    <Button variant="outlined" startIcon={<ViewListIcon />} onClick={back}>
      Back to song list
    </Button>
  );
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
        <ShareButton close={close} />
        <EditViewButton close={close} />
        <SongListButton close={close} />
        <ShowOnGitHubButton />
      </Stack>
    </Box>
  );
}
