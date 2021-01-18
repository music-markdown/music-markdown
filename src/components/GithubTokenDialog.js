import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionActions";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { isValidGithubToken } from "../lib/github";
import { useGlobalStateContext } from "./GlobalState";
import { withStyles } from "@material-ui/core/styles";

const ExpansionPanelDetails = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
  },
})(AccordionDetails);

const GithubTokenInstructions = () => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>
        Set a <b>GitHub Token</b> to create or change Music Markdown files in
        GitHub.
      </Typography>
    </AccordionSummary>
    <ExpansionPanelDetails>
      <div>
        <h1>How to Create a New Token</h1>

        <p>
          These instructions will help you create a new GitHub token, and add it
          to Music Markdown so that you can use the Music Markdown editor.
        </p>

        <ol>
          <li>
            Open your{" "}
            <a href="https://github.com/settings/tokens">
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
    </ExpansionPanelDetails>
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
