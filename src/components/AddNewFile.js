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
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { putContents } from '../lib/github';

class AddNewFile extends React.Component {
  state = {
    newFileName: '',
    newFileOpen: false,
    toEditor: false,
    message: '',
    error: false
  };

  handleAddNewFileOpen = () => {
    this.setState({ newFileOpen: true });
  }

  handleAddNewFileClose = () => {
    this.setState({
      newFileOpen: false,
      newFileName: ''
    });
  }

  handleUpdateFileName = (event) => {
    this.setState({ newFileName: event.target.value });
  }

  handleAddNewFile = async () => {
    const { repo, branch, path } = this.props.match.params;
    const { newFileName } = this.state;

    const pathName = path ? `${path}/${newFileName}.md` : `${newFileName}.md`;
    const content = btoa(`---
---

# ${newFileName}`);

    const response = await putContents(repo, pathName, content, undefined, branch);

    if (response.status !== 201) {
      this.handleShowError(`${response.status}: ${response.statusText}`);
      return;
    }

    this.setState({ toEditor: true });
  }

  handleShowError = (message) => {
    this.setState({
      message,
      error: true
    });
  }

  handleClearError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ error: false });
  }

  render() {
    const { newFileOpen, toEditor, newFileName } = this.state;

    if (toEditor) {
      const { location } = this.props;
      const parts = location.pathname.split('/');
      parts[4] = 'editor';

      return <Redirect to={`${parts.join('/')}${newFileName}.md/`} />;
    }

    return (
      <>
        <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
          <Fab aria-label='Add' onClick={this.handleAddNewFileOpen}>
            <Add />
          </Fab>
          <Dialog open={newFileOpen} aria-labelledby='add-new-file-dialog'>
            <DialogTitle id='add-new-file-dialog-title'>New File</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin='dense'
                id='owner'
                label='File Name'
                value={this.state.newFileName}
                onChange={(e) => this.handleUpdateFileName(e)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleAddNewFileClose}>Cancel</Button>
              <Button onClick={this.handleAddNewFile}>Create</Button>
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
}

export default AddNewFile;
