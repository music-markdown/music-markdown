import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CallSplit from '@material-ui/icons/CallSplit';
import DirectoryBreadcrumbs from './RouterBreadcrumbs';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { getBranches } from '../lib/github';
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
class BranchNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      branches: []
    };
  }

  /**
   * When component first initializes, execute following lifecycle actions
   */
  async componentDidMount() {
    const branches = await getBranches(this.props.match.params.repo);
    this.setState({
      isLoaded: true,
      branches
    });
  }

  /**
   * When a page is reloaded with a new url parameters, then following lifecycle actions
   * @param {Object} prevProps Updated query string
   */
  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.repo !== this.props.match.params.repo) {
      const branches = await getBranches(this.props.match.params.repo);
      this.setState({
        isLoaded: true,
        branches
      });
    }
  }

  render() {
    const { isLoaded, branches } = this.state;
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
          <List>
            {
              branches.map((item) => (
                <ListItem button component={Link}
                  key={`list-group-item-${item.name}`}
                  to={`/repos/${this.props.match.params.repo}/browser/${item.name}`}>
                  <ListItemAvatar>
                    <Avatar>
                      <CallSplit />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name}></ListItemText>
                </ListItem>
              ))
            }
          </List>
        </div>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BranchNavigation);
