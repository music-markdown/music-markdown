import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";
import ErrorSnackbar from "../ErrorSnackbar";

const useStyles = makeStyles((theme) => ({
  grid: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function AddRepository({ handleAddRepository }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setName("");
    setOwner("");
    setError(false);
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

  const handleDialogAdd = async () => {
    try {
      await handleAddRepository(`${owner}/${name}`);
      handleDialogClose();
    } catch (err) {
      handleShowError(err.message);
    }
  };

  const handleUpdateOwner = (event) => {
    setOwner(event.target.value);
  };

  const handleUpdateName = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Grid
        container
        className={classes.grid}
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Fab aria-label="Add" onClick={handleDialogOpen}>
          <AddIcon />
        </Fab>
        <Dialog open={open} aria-labelledby="add-repository-dialog">
          <DialogTitle id="add-repository-dialog-title">
            Add Repository
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="owner"
              label="Repository Owner"
              value={owner}
              onChange={handleUpdateOwner}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Repository Name"
              value={name}
              onChange={handleUpdateName}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogAdd}>Add</Button>
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
