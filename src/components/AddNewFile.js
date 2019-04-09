import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
  whitespacePre: {
    whiteSpace: 'pre-line',
    fontFamily: 'monospace',
  }
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
    const { repo, branch } = this.props.match.params;
    const path = this.getNewFilePath();
    const content = btoa(this.getTemplateContents());

    const response = await putContents(repo, path, content, undefined, branch);

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

  isValidFileName = () => (!!this.state.newFileName.match(/^[^<>:"/\\|?*]+$/))
  getTemplateContents = () => (`---\n---\n\n# ${this.state.newFileName}`)
  getNewFilePath = () => {
    const file = this.state.newFileName;
    const path = this.props.match.params.path;
    return path ? `${path}/${file}.md` : `${file}.md`;
  }

  render() {
    const { classes } = this.props;
    const { newFileOpen, toEditor } = this.state;
    const { repo, branch } = this.props.match.params;

    if (toEditor) {
      return <Redirect to={`/repos/${repo}/editor/${branch}/${this.getNewFilePath()}`} />;
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
              <Card className={classes.previewCard}>
                <CardContent>
                  <Typography variant="caption" color="textSecondary" gutterBottom>
                    Preview
                  </Typography>
                  <Typography variant="body1" color="textPrimary" className={classes.whitespacePre}>
                    {this.getTemplateContents()}
                  </Typography>
                </CardContent>
              </Card>
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
                  : <>{repo}/{branch}/{this.getNewFilePath()}</>}
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
