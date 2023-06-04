import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PhotoFilterIcon from "@mui/icons-material/PhotoFilter";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useGitHubApi } from "../../context/GitHubApiProvider";

interface EditButtonPanelProps {
  disabled: boolean;
  format: () => void;
  dirty: boolean;
  saving: boolean;
  save: () => void;
  revert: () => void;
}

export default function EditButtonPanel({
  disabled,
  format,
  dirty,
  saving,
  save,
  revert,
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
          variant="outlined"
          startIcon={<PhotoFilterIcon />}
          onClick={format}
          disabled={disabled}
        >
          Format
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          startIcon={<ExitToAppIcon />}
          href={viewerLink}
          disabled={disabled}
        >
          Viewer
        </Button>
        <Button
          variant="outlined"
          startIcon={<RestorePageIcon />}
          disabled={!dirty || disabled}
          onClick={revert}
        >
          Revert
        </Button>
        <LoadingButton
          loading={saving}
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={!dirty || !gitHubToken || disabled}
          onClick={save}
        >
          Save
        </LoadingButton>
      </Stack>
    </Paper>
  );
}
