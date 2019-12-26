import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ErrorSnackbar from "./ErrorSnackbar";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { putContents } from "../lib/github";
import { useGlobalStateContext } from "./GlobalState";

const useStyles = makeStyles(theme => ({
  whitespacePre: {
    whiteSpace: "pre-line",
    fontFamily: "monospace"
  },
  grid: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default function AddNewFile({ match }) {
  const classes = useStyles();
  const context = useGlobalStateContext();
  const [newFileName, setNewFileName] = useState("");
  const [newFileOpen, setNewFileOpen] = useState(false);
  const [toEditor, setToEditor] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleAddNewFileOpen = () => {
    setNewFileOpen(true);
  };

  const handleAddNewFileClose = () => {
    setNewFileOpen(false);
    setNewFileName("");
  };

  const handleUpdateFileName = event => {
    setNewFileName(event.target.value);
  };

  const handleAddNewFile = async () => {
    const { repo, branch } = match.params;
    const path = getNewFilePath();
    const content = getTemplateContents();

    const response = await putContents(repo, path, content, undefined, branch);

    if (response.status !== 201) {
      handleShowError(`${response.status}: ${response.statusText}`);
      return;
    }
    setToEditor(true);
  };

  const handleShowError = message => {
    setMessage(message);
    setError(true);
  };

  const handleClearError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const isValidFileName = () => !!newFileName.match(/^[^<>:"/\\|?*]+$/);
  const getTemplateContents = () => `---\n---\n\n# ${newFileName}`;
  const getNewFilePath = () =>
    match.params.path
      ? `${match.params.path}/${newFileName}.md`
      : `${newFileName}.md`;

  const { repo, branch } = match.params;

  if (toEditor) {
    return (
      <Redirect to={`/repos/${repo}/editor/${branch}/${getNewFilePath()}`} />
    );
  }

  return (
    <>
      <Grid
        container
        className={classes.grid}
        direction="row"
        justify="flex-end"
        alignItems="flex-end"
      >
        <Tooltip
          title={
            context.isValidGithubToken()
              ? "Add Song"
              : "Add a GitHub Token to Enable Editing"
          }
        >
          <span>
            <Fab
              aria-label="Add"
              disabled={!context.isValidGithubToken()}
              onClick={handleAddNewFileOpen}
            >
              <AddIcon />
            </Fab>
          </span>
        </Tooltip>
        <Dialog
          open={newFileOpen}
          aria-labelledby="add-new-file-dialog"
          fullWidth={true}
        >
          <DialogTitle id="add-new-file-dialog-title">
            Create New Music Markdown File
          </DialogTitle>
          <DialogContent>
            <Card className={classes.previewCard}>
              <CardContent>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  gutterBottom
                >
                  Preview
                </Typography>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  className={classes.whitespacePre}
                >
                  {getTemplateContents()}
                </Typography>
              </CardContent>
            </Card>
            <TextField
              autoFocus
              margin="dense"
              id="owner"
              label="Music Markdown File Name"
              value={newFileName}
              onChange={handleUpdateFileName}
              fullWidth
              error={!isValidFileName()}
              helperText={
                !isValidFileName() ? (
                  "Invalid file name"
                ) : (
                  <>
                    {repo}/{branch}/{getNewFilePath()}
                  </>
                )
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">.md</InputAdornment>
                )
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddNewFileClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleAddNewFile}
              color="primary"
              disabled={!isValidFileName()}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <ErrorSnackbar
        message={message}
        open={error}
        handleClose={handleClearError}
      />
    </>
  );
}
