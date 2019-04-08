import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorSnackbar from './ErrorSnackbar';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import React from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { putContents } from '../lib/github';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  previewCard: {
    padding: 12,
  },
});

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
    const content = btoa(this.getTemplateContents());

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

  isValidFileName = () => (!!this.state.newFileName.match(/^[^<>:"\/\\|?*]+$/))

  getTemplateContents = () => (`---\n---\n\n# ${this.state.newFileName}`);

  render() {
    const { newFileOpen, toEditor, newFileName } = this.state;
    const { classes, location } = this.props;
    const parts = location.pathname.split('/');

    if (toEditor) {
      parts[4] = 'editor';
      return <Redirect to={`${parts.join('/')}${newFileName}.md`} />;
    }

    return (
      <>
        <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
          <Fab aria-label='Add' onClick={this.handleAddNewFileOpen}>
            <Add />
          </Fab>
          <Dialog open={newFileOpen} aria-labelledby='add-new-file-dialog' fullWidth={true}>
            <DialogTitle id='add-new-file-dialog-title'>Create New Music Markdown File</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Card className={classes.previewCard}>
                  <Typography variant="caption" color="textSecondary" gutterBottom>
                    Preview
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    <pre>{this.getTemplateContents()}</pre>
                  </Typography>
                </Card>
              </DialogContentText>
              <TextField
                autoFocus
                margin='dense'
                id='owner'
                label='Music Markdown File Name'
                value={this.state.newFileName}
                onChange={(e) => this.handleUpdateFileName(e)}
                fullWidth
                error={!this.isValidFileName()}
                helperText={!this.isValidFileName()
                  ? 'Invalid file name'
                  : <div>{parts[2]}/{parts[3]}/{parts[5]}/{parts.slice(6).join('/')}{newFileName}.md</div>}
                InputProps={{
                  endAdornment: <InputAdornment position="end">.md</InputAdornment>
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleAddNewFileClose} color="secondary">Cancel</Button>
              <Button onClick={this.handleAddNewFile} color="primary" disabled={!this.isValidFileName()}>Create</Button>
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

export default withStyles(styles, { withTheme: true })(AddNewFile);
