import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PhotoFilterIcon from "@mui/icons-material/PhotoFilter";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { useGitHubApi } from "../../context/GitHubApiProvider";

interface EditButtonPanelProps {
  format: () => void;
  dirty: boolean;
  saving: boolean;
  save: () => void;
}

export default function EditButtonPanel({
  format,
  dirty,
  saving,
  save,
}: EditButtonPanelProps) {
  const theme = useTheme();
  const { gitHubToken } = useGitHubApi();
  const { pathname } = useLocation();

  const parts = pathname.split("/");
  parts[4] = "viewer";
  const viewerLink = parts.join("/");

  return (
    <Paper square variant="outlined" sx={{ padding: theme.spacing(1) }}>
      <Stack spacing={1} direction="row">
        <Button
          variant="contained"
          startIcon={<PhotoFilterIcon />}
          onClick={format}
        >
          Auto Format
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          startIcon={<ExitToAppIcon />}
          component={Link}
          to={viewerLink}
        >
          Exit to Viewer
        </Button>
        <LoadingButton
          loading={saving}
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={!dirty || !gitHubToken}
          onClick={save}
        >
          Save Changes
        </LoadingButton>
      </Stack>
    </Paper>
  );
}
