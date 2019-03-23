import React from 'react';
import classNames from 'classnames';
import Add from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ErrorIcon from '@material-ui/icons/Error';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';


const styles2 = (theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

const ErrorSnackbar = (props) => (
  <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
    <SnackbarContent
      className={props.classes.error}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={props.classes.message}>
          <ErrorIcon className={classNames(props.classes.icon, props.classes.iconVariant)} />
          {props.message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={props.classes.close}
          onClick={props.handleClose}
        >
          <CloseIcon className={props.classes.icon} />
        </IconButton>,
      ]}
    />
  </Snackbar>
);

const StyledErrorSnackbar = withStyles(styles2)(ErrorSnackbar);


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

  // TODO: style to add margin on right.
  render = () => (
    <>
      <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
        <IconButton aria-label='Add' onClick={this.handleDialogOpen}>
          <Add />
        </IconButton>
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
      <StyledErrorSnackbar
        message={this.state.message}
        open={this.state.error}
        handleClose={this.handleClearError} />
    </>
  );
}

export default AddRepository;
