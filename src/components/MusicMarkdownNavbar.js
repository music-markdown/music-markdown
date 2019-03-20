import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getRepositories, addRepository } from '../lib/github';
import { REPOS_LOCAL_STORAGE_KEY } from '../lib/constants';

const styles = (theme) => ({
  reactRouterHoverInherit: theme.reactRouterHoverInherit
});

const MusicMarkdownNavbar = (props) => {
  const { classes } = props;

  if (!localStorage.getItem(REPOS_LOCAL_STORAGE_KEY)) {
    // TODO: sanitize this input when storing
    addRepository('music-markdown', 'almost-in-time', '/', 'master');
  }

  return (
    <AppBar position={'sticky'} key='top-navbar'>
      <Toolbar>
        <Button className={classes.reactRouterHoverInherit} component={Link} to='/'>
          <Typography variant='h6'>
            Music Markdown
          </Typography>
        </Button>
        <RepositoriesNavDropdown {...props} />
        <Button className={classes.reactRouterHoverInherit} component={NavLink} to='/sandbox'>
          Sandbox
        </Button>
      </Toolbar>
    </AppBar>
  );
};

/**
 * For all added repositories, add it to the dropdown list
 */
// TODO: List first x items, then put in dropdown item to expand full list
class RepositoriesNavDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      open: !state.open
    }));
  }

  handleClose() {
    this.setState(() => ({
      open: false
    }));
  }

  render() {
    const repoDropdownItems = [];
    const repoList = getRepositories();

    if (repoList.length > 0) {
      const { reactRouterHoverInherit } = this.props.classes;

      repoList.forEach((repo) => {
        const repoId = `${repo.owner}/${repo.repo}/${repo.branch}${repo.path}`;
        repoDropdownItems.push(
          <MenuItem component={NavLink}
            to={`/repos/${repo.owner}/${repo.repo}/browser/${repo.branch}${repo.path}`}
            key={`dropdown-item-${repoId}`}
            onClick={this.handleClose}
            className={reactRouterHoverInherit}>
            {repoId}
          </MenuItem>);
      });
    }

    const { open } = this.state;

    return (
      <>
        <Button onClick={this.handleClick} buttonRef={(node) => {
          this.anchorEl = node;
        }}>
          Music Repositories
        </Button>

        <Menu id='dropdown-menu' anchorEl={this.anchorEl} open={open} onClose={this.handleClose}>
          {repoDropdownItems}
        </Menu>
      </>
    );
  }
};

export default withStyles(styles)(MusicMarkdownNavbar);
