import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useSnackbar } from "../../context/SnackbarProvider";

const StyledGrid = styled(Grid)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

export default function AddRepository({ handleAddRepository }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const { errorSnackbar, closeSnackbar } = useSnackbar();

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setName("");
    setOwner("");
    closeSnackbar();
  };

  const handleDialogAdd = async () => {
    try {
      await handleAddRepository(`${owner}/${name}`);
      handleDialogClose();
    } catch (err) {
      errorSnackbar(err.message);
    }
  };

  const handleUpdateOwner = (event) => {
    setOwner(event.target.value);
  };

  const handleUpdateName = (event) => {
    setName(event.target.value);
  };

  return (
    <StyledGrid
      container
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
    </StyledGrid>
  );
}
