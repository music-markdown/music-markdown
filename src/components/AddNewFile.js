import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorSnackbar from "./ErrorSnackbar";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import { Redirect } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import { putContents } from "../lib/github";
import { useGlobalStateContext } from "./GlobalState";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  whitespacePre: {
    whiteSpace: "pre-line",
    fontFamily: "monospace",
  },
  grid: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
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

  const handleUpdateFileName = (event) => {
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

  const handleShowError = (message) => {
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

  return <>
    <Grid
      container
      className={classes.grid}
      direction="row"
      justifyContent="flex-end"
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
              ),
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
  </>;
}
