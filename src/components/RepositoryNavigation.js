import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import DescriptionIcon from '@material-ui/icons/Description';
import DirectoryBreadcrumbs from './RouterBreadcrumbs';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import FolderIcon from '@material-ui/icons/Folder';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { getContents } from '../lib/github';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  root: {
    flexGrow: 1,
    padding: 8,
  },
});

/**
 * A React component for rendering repository items when navigating the /repos resource
 */
class RepositoryNavigation extends React.Component {
  state = {
    isLoaded: false,
    contents: [],
    newFileName: '',
    newFileOpen: false
  };

  async componentDidMount() {
    const { repo, path, branch } = this.props.match.params;

    const contents = await getContents(repo, path, branch);
    this.setState({
      isLoaded: true,
      contents
    });
  }

  /**
   * When a page is reloaded with a new url parameters, then following lifecycle actions
   * @param {Object} prevProps Props before update
   */
  async componentDidUpdate(prevProps) {
    const { repo: prevRepo, path: prevPath, branch: prevBranch } = prevProps.match.params;
    const { repo, path, branch } = this.props.match.params;

    if (prevRepo !== repo || prevPath !== path || prevBranch !== branch) {
      const contents = await getContents(repo, path, branch);
      this.setState({
        isLoaded: true,
        contents
      });
    }
  }

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

  render() {
    const { repo, branch } = this.props.match.params;
    const { isLoaded, contents, newFileOpen } = this.state;
    const { classes, location } = this.props;

    if (!isLoaded) {
      return (
        <LinearProgress />
      );
    }

    const parts = location.pathname.split('/');
    parts[4] = 'editor';

    return (
      <>
        <DirectoryBreadcrumbs pathname={this.props.location.pathname} />
        <div className={classes.root}>
          <List key={'repo-navigation-list'}>
            {
              contents.map((item) => (
                <ListItem button component={Link}
                  key={`list-group-item-${item.name}`}
                  to={`/repos/${repo}/${item.type === 'dir' ? 'browser' : 'viewer'}/${branch}/${item.path}/`}>
                  <ListItemAvatar>
                    <Avatar>
                      {item.type === 'dir' ? <FolderIcon /> : <DescriptionIcon /> }
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.type === 'dir' ? <i>{item.name}</i> : item.name}></ListItemText>
                </ListItem>
              ))
            }
          </List>
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
                <Button onClick={this.handleAddNewFile}>Add</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </div>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RepositoryNavigation);
