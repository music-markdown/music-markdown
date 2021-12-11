import { Button, Typography } from "@mui/material";

import { Box } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";
import GithubTokenDialog from "./GithubTokenDialog";
import { useState } from "react";

export default function GithubTokenMenuItem() {
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);

  const handleApiKeyDialogOpen = () => {
    setApiKeyDialogOpen(true);
  };

  const handleApiKeyDialogClose = () => {
    setApiKeyDialogOpen(false);
  };

  return (
    <Box>
      <Typography variant="subtitle1">GitHub Token</Typography>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleApiKeyDialogOpen}
        startIcon={<GitHubIcon />}
      >
        Set GitHub Token
      </Button>

      <GithubTokenDialog
        open={apiKeyDialogOpen}
        handleClose={handleApiKeyDialogClose}
      ></GithubTokenDialog>
    </Box>
  );
}
