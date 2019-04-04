import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorSnackbar from './ErrorSnackbar';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import TextField from '@material-ui/core/TextField';

class AddRepository extends React.Component {
  state = {
    open: false,
    name: '',
    owner: '',
    message: null,
    error: false
  };

  handleDialogOpen = () => {
    this.setState({ open: true });
  }

  handleDialogClose = () => {
    this.setState({
      open: false,
      name: '',
      owner: '',
      error: false
    });
  }

  handleShowError = (message) => {
    this.setState({
      message: message,
      error: true
    });
  }

  handleClearError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ error: false });
  }

  handleDialogAdd = async () => {
    try {
      await this.props.handleAddRepository(`${this.state.owner}/${this.state.name}`);
      this.handleDialogClose();
    } catch (err) {
      this.handleShowError(err.message);
    }
  }

  handleUpdateOwner = (event) => {
    this.setState({ owner: event.target.value });
  }

  handleUpdateName = (event) => {
    this.setState({ name: event.target.value });
  }

  render = () => (
    <>
      <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
        <Fab aria-label='Add' onClick={this.handleDialogOpen}>
          <Add />
        </Fab>
        <Dialog open={this.state.open} aria-labelledby='add-repository-dialog'>
          <DialogTitle id='add-repository-dialog-title'>Add Repository</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='owner'
              label='Repository Owner'
              value={this.state.owner}
              onChange={(e) => this.handleUpdateOwner(e)}
              fullWidth
            />
            <TextField
              margin='dense'
              id='name'
              label='Repository Name'
              value={this.state.name}
              onChange={(e) => this.handleUpdateName(e)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose}>Cancel</Button>
            <Button onClick={this.handleDialogAdd}>Add</Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <ErrorSnackbar
        message={this.state.message}
        open={this.state.error}
        handleClose={this.handleClearError} />
    </>
  );
}

export default AddRepository;
