import AddNewFile from './AddNewFile';
import Avatar from '@material-ui/core/Avatar';
import DescriptionIcon from '@material-ui/icons/Description';
import DirectoryBreadcrumbs from './RouterBreadcrumbs';
import FolderIcon from '@material-ui/icons/Folder';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
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

  render() {
    const { repo, branch } = this.props.match.params;
    const { isLoaded, contents } = this.state;
    const { classes } = this.props;

    if (!isLoaded) {
      return (
        <LinearProgress />
      );
    }

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
          <AddNewFile {...this.props} />
        </div>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RepositoryNavigation);
