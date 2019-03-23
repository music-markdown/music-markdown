import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SettingsIcon from '@material-ui/icons/Settings';

import { getRepositories, addRepository } from '../lib/github';
import { REPOS_LOCAL_STORAGE_KEY } from '../lib/constants';
import MusicToolbar from './MusicToolbar';
import { setDarkTheme } from '../redux/actions';

const styles = (theme) => ({
  reactRouterHoverInherit: theme.reactRouterHoverInherit,
  paper: {
    padding: `${theme.spacing.unit}px`,
  },
  grow: {
    flexGrow: 1
  }
});

class MusicMarkdownNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toolbarOpen: false,
      settingsOpen: false,
      isDarkTheme: false
    };

    this.settingsAnchorEl = undefined;

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handleDarkThemeSwitch = this.handleDarkThemeSwitch.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ toolbarOpen: !this.state.toolbarOpen });
  };

  handleSettingsClick() {
    this.setState({ settingsOpen: !this.state.settingsOpen });
  }

  handleDarkThemeSwitch() {
    this.props.setDarkTheme(!this.state.isDarkTheme);
    this.setState({ isDarkTheme: !this.state.isDarkTheme });
  }

  render() {
    const { classes } = this.props;
    const { toolbarOpen, settingsOpen, isDarkTheme } = this.state;

    if (!localStorage.getItem(REPOS_LOCAL_STORAGE_KEY)) {
      // TODO: sanitize this input when storing
      addRepository('music-markdown', 'almost-in-time', '/', 'master');
    }

    return (
      <>
        <AppBar position={'sticky'} key='top-navbar'>
          <Toolbar>
            <Button className={classes.reactRouterHoverInherit} component={Link} to='/'>
              <Typography variant='h6'>
                Music Markdown
              </Typography>
            </Button>
            <RepositoriesNavDropdown {...this.props} />
            <Button className={classes.reactRouterHoverInherit} component={NavLink} to='/sandbox'>
              Sandbox
            </Button>
            <div className={classes.grow} />
            <Button onClick={this.handleDrawerOpen}>
              Toolbar
            </Button>
            <IconButton onClick={this.handleSettingsClick} buttonRef={(node) => {
              this.settingsAnchorEl = node;
            }}>
              <SettingsIcon/>
            </IconButton>
            <Popper
              id='settings-popper'
              open={settingsOpen}
              anchorEl={this.settingsAnchorEl}
              placement='bottom-end'>
              <Paper className={classes.paper}>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked={isDarkTheme}
                      onChange={this.handleDarkThemeSwitch}
                      value='darkTheme' />
                  }
                  label='Toggle Dark Mode?'
                />
              </Paper>
            </Popper>
          </Toolbar>
        </AppBar>
        <Drawer open={toolbarOpen} variant={'persistent'} anchor={'bottom'}>
          <Divider />
          <MusicToolbar></MusicToolbar>
        </Drawer>
      </>
    );
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

export default connect(undefined, { setDarkTheme })(withStyles(styles)(MusicMarkdownNavbar));
