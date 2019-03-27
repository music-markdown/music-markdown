import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';

import { getRepositories } from '../lib/github';
import MusicToolbar from './MusicToolbar';

const styles = (theme) => ({
  reactRouterHoverInherit: theme.reactRouterHoverInherit,
  grow: {
    flexGrow: 1
  }
});

class MusicMarkdownNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose() {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    const MusicMarkdownNavbar = () => (
      <>
        <AppBar position={'sticky'} key='top-navbar'>
          <Toolbar>
            <Button className={classes.reactRouterHoverInherit} component={Link} to='/'>
              <img src="music-markdown.svg" width={50} alt="Music Markdown" />
            </Button>
            <RepositoriesNavDropdown {...this.props} />
            <div className={classes.grow} />
            <Button onClick={this.handleDrawerOpen}>
              Toolbar
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer open={open} variant={'persistent'} anchor={'bottom'}>
          <Divider />
          <MusicToolbar></MusicToolbar>
        </Drawer>
      </>
    );

    const BaseNavbar = () => (
      <>
        <AppBar position={'sticky'} key='top-navbar'>
          <Toolbar>
            <Button className={classes.reactRouterHoverInherit} component={Link} to='/'>
              <img src="music-markdown.svg" width={50} alt="Music Markdown" />
            </Button>
            <RepositoriesNavDropdown {...this.props} />
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
      </>
    );

    const basePath = this.props.location.pathname.split('/')[1];

    switch(basePath) {
      case 'repos':
        return MusicMarkdownNavbar();
      default:
        return BaseNavbar();
    }

  }
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
        repoDropdownItems.push(
          <MenuItem component={NavLink}
            to={`/repos/${repo}`}
            key={`dropdown-item-${repo}`}
            onClick={this.handleClose}
            className={reactRouterHoverInherit}>
            {repo}
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
          <Divider />
          <MenuItem component={NavLink}
            to='/repos'
            key='edit-repos'
            onClick={this.handleClose}
            className={this.props.classes.reactRouterHoverInherit}>
            Edit Repositories
          </MenuItem>
        </Menu>
      </>
    );
  }
};

export default withStyles(styles)(MusicMarkdownNavbar);
