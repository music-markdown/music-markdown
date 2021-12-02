import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { isValidGithubToken } from "../lib/github";
import { useGlobalStateContext } from "./GlobalState";
import { useState } from "react";
import withStyles from "@mui/styles/withStyles";

const AccordionDetails = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
  },
})(AccordionActions);

const GithubTokenInstructions = () => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>
        Set a <b>GitHub Token</b> to create or change Music Markdown files in
        GitHub.
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <div>
        <h1>How to Create a New Token</h1>

        <p>
          These instructions will help you create a new GitHub token, and add it
          to Music Markdown so that you can use the Music Markdown editor.
        </p>

        <ol>
          <li>
            Open your{" "}
            <a
              href="https://github.com/settings/tokens"
              rel="noreferrer"
              target="_blank"
            >
              Personal access tokens
            </a>{" "}
            page in GitHub.
          </li>
          <li>
            Click <b>Generate new token</b>.
          </li>
          <li>
            Under <b>Note</b> type <b>Music Markdown</b>.
          </li>
          <li>
            Under <b>scopes</b> grant <b>repo</b> permissions.
          </li>
          <li>
            Scroll to the bottom and click <b>Generate token</b>.
          </li>
          <li>Copy the newly generated token and paste it below.</li>
        </ol>
      </div>
    </AccordionDetails>
  </Accordion>
);

export default function GithubTokenDialog({ open, handleClose }) {
  const context = useGlobalStateContext();
  const [token, setToken] = useState(context.data.githubToken);

  const isValidToken = (token) => {
    return token === "" || isValidGithubToken(token);
  };

  const handleSaveToken = () => {
    if (isValidToken(token)) {
      context.setGithubToken(token);
      handleClose();
    }
  };

  const handleCloseDialog = () => {
    setToken(context.data.githubToken);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle id="set-github-api-key">Set GitHub Token</DialogTitle>
      <DialogContent>
        <GithubTokenInstructions />
      </DialogContent>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="GitHub Token"
          fullWidth
          value={token || ""}
          onChange={(e) => setToken(e.target.value)}
          error={!isValidToken(token)}
          helperText="Warning: GitHub tokens are very sensitive. Anyone who 
          gains access to this token will have access to your GitHub account.
          Please proceed with caution."
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSaveToken}
          color="primary"
          disabled={!isValidToken(token)}
        >
          {token === "" ? "Clear" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
