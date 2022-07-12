import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import ShareIcon from "@mui/icons-material/Share";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory, useParams } from "react-router";

const ShareButton = ({ closeMenu, openQrCodeDialog }) => {
  const handleOpen = () => {
    closeMenu();
    openQrCodeDialog();
  };

  return (
    <Button variant="outlined" startIcon={<ShareIcon />} onClick={handleOpen}>
      Share song
    </Button>
  );
};

const EditViewButton = ({ closeMenu }) => {
  const history = useHistory();
  const { repo, mode, branch, path } = useParams();

  const edit = () => {
    closeMenu();
    history.push(`/repos/${repo}/editor/${branch}/${path}`);
  };

  const view = () => {
    closeMenu();
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

const SongListButton = ({ closeMenu }) => {
  const history = useHistory();
  const { repo, branch, path } = useParams();
  const folder = path.split("/").slice(0, -1).join("/");

  const back = () => {
    closeMenu();
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

export default function SongActionsMenuItem({ closeMenu, openQrCodeDialog }) {
  return (
    <Box>
      <Typography variant="subtitle1">Song Actions</Typography>
      <Stack direction="column" spacing={1}>
        <ShareButton
          closeMenu={closeMenu}
          openQrCodeDialog={openQrCodeDialog}
        />
        <EditViewButton closeMenu={closeMenu} />
        <SongListButton closeMenu={closeMenu} />
        <ShowOnGitHubButton />
      </Stack>
    </Box>
  );
}
