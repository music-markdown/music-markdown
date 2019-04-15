import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import { Link } from 'react-router-dom';
import MusicToolbar from './MusicToolbar';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { REPO_REGEX } from '../lib/constants';
import React from 'react';
import { Route } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import SettingsIcon from '@material-ui/icons/Settings';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { setDarkTheme } from '../redux/actions';
import withStyles from '@material-ui/core/styles/withStyles';

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
  },
});

const EditButton = ({ location }) => {
  const parts = location.pathname.split('/');
  const view = parts[4];

  if (view === 'viewer') {
    parts[4] = 'editor';
    return (
      <IconButton component={Link} to={parts.join('/')}>
        <EditIcon />
      </IconButton>
    );
  }

  return null;
};

class ColumnCountSelector extends React.Component {
  handleUpdateColumnCount = (event) => {
    const params = queryString.parse(this.props.location.search);
    if (event.target.value === '1') {
      delete params.columnCount;
    } else {
      params.columnCount = event.target.value;
    }
    this.props.history.push({ search: queryString.stringify(params) });
  }

  render() {
    const params = queryString.parse(this.props.location.search);
    const columnCount = params.columnCount || 1;

    return (
      <FormControl>
        <InputLabel>Columns</InputLabel>
        <Select native value={columnCount} onChange={this.handleUpdateColumnCount}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
        </Select>
      </FormControl>
    );
  }
};

class MusicMarkdownNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toolbarOpen: false,
      settingsOpen: false,
      isDarkTheme: props.theme.palette.type === 'dark'
    };

    this.settingsAnchorEl = undefined;
    this.toolbarAnchorEl = undefined;

    this.handleMusicToolbarOpen = this.handleMusicToolbarOpen.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handleDarkThemeSwitch = this.handleDarkThemeSwitch.bind(this);
  }

  handleMusicToolbarOpen() {
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
    const { toolbarOpen, settingsOpen, isDarkTheme } = this.state;
    const { classes, location } = this.props;

    const MusicNavbarToolbar = () => (
      <>
        {/* TODO: Placeholder for search functionality */}
        <Button>
          <SearchIcon />
        </Button>
        <IconButton onClick={this.handleMusicToolbarOpen} buttonRef={(node) => {
          this.toolbarAnchorEl = node;
        }}>
          <LibraryMusic />
        </IconButton>
        <Popper
          id='music-toolbar-popper'
          open={toolbarOpen}
          anchorEl={this.toolbarAnchorEl}
          placement='bottom-end'>
          <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={this.handleMusicToolbarOpen}>
              <MusicToolbar></MusicToolbar>
            </ClickAwayListener>
          </Paper>
        </Popper>
        <EditButton location={location} />
      </>
    );

    const BaseNavbar = (renderMusicNavbarToolbarFlag) => (
      <>
        <AppBar position={'sticky'} key='top-navbar'>
          <Toolbar>
            <Button className={classes.reactRouterHoverInherit} component={Link} to='/'>
              <img className={isDarkTheme ? classes.filter : ''}
                src="music-markdown.svg" width={50} alt="Music Markdown" />
            </Button>
            <div className={classes.grow} />
            {renderMusicNavbarToolbarFlag ? MusicNavbarToolbar() : null}
            <Route path={['/sandbox', `${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`]}
              component={ColumnCountSelector} />
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
                <ClickAwayListener onClickAway={this.handleSettingsClick}>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked={isDarkTheme}
                        onChange={this.handleDarkThemeSwitch}
                        value='darkTheme' />
                    }
                    label='Toggle Dark Mode?'
                  />
                </ClickAwayListener>
              </Paper>
            </Popper>
          </Toolbar>
        </AppBar>
      </>
    );

    const basePath = this.props.location.pathname.split('/')[4];

    switch (basePath) {
    case 'viewer':
    case 'editor':
    case 'sandbox':
      return BaseNavbar(true);
    default:
      return BaseNavbar(false);
    }
  }
};

export default connect(undefined, { setDarkTheme })(withStyles(styles, { withTheme: true })(MusicMarkdownNavbar));
