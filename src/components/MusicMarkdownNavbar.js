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
import withStyles from '@material-ui/core/styles/withStyles';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';

import { getRepositories } from '../lib/github';
import MusicToolbar from './MusicToolbar';
import { setDarkTheme } from '../redux/actions';

const styles = (theme) => ({
  reactRouterHoverInherit: theme.reactRouterHoverInherit,
  paper: {
    padding: `${theme.spacing.unit}px`,
  },
  grow: {
    flexGrow: 1
  },
  filter: {
    filter: 'invert(100%)'
  }
});

class MusicMarkdownNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toolbarOpen: false,
      settingsOpen: false,
      isDarkTheme: props.theme.palette.type === 'dark'
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

    const MusicMarkdownNavbar = () => (
      <>
        <AppBar position={'sticky'} key='top-navbar'>
          <Toolbar>
            <Button className={classes.reactRouterHoverInherit} component={Link} to='/'>
              <img className={isDarkTheme ? classes.filter : ''}
                src="music-markdown.svg" width={50} alt="Music Markdown" />
            </Button>
            <RepositoriesNavDropdown {...this.props} />
            <div className={classes.grow} />
            <Button>
              <SearchIcon />
            </Button>
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

    const BaseNavbar = () => (
      <>
        <AppBar position={'sticky'} key='top-navbar'>
          <Toolbar>
            <Button className={classes.reactRouterHoverInherit} component={Link} to='/'>
              <img src="music-markdown.svg" width={50} alt="Music Markdown" />
            </Button>
            <RepositoriesNavDropdown {...this.props} />
            <div className={classes.grow} />
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
      </>
    );

    const basePath = this.props.location.pathname.split('/')[1];

    switch (basePath) {
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

export default connect(undefined, { setDarkTheme })(withStyles(styles, { withTheme: true })(MusicMarkdownNavbar));
