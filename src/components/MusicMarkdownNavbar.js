import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import MusicToolbar from './MusicToolbar';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { REPO_REGEX } from '../lib/constants';
import React from 'react';
import { Route } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import ViewListIcon from '@material-ui/icons/ViewList';
import { connect } from 'react-redux';
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

const BrowseButton = ({ match }) => (
  <Tooltip title="Song List View">
    <IconButton component={Link} to={`/browser/repos/${match.params.repo}/${match.params.branch}`}>
      <ViewListIcon />
    </IconButton>
  </Tooltip>
);

const EditButton = ({ match }) => (
  <Tooltip title="Edit Song">
    <IconButton component={Link}
      to={`/editor/repos/${match.params.repo}/${match.params.branch}/${match.params.path}`}>
      <EditIcon />
    </IconButton>
  </Tooltip>
);

const ViewButton = ({ match }) => (
  <Tooltip title="Markdown View">
    <IconButton component={Link}
      to={`/viewer/repos/${match.params.repo}/${match.params.branch}/${match.params.path}`}>
      <ExitToAppIcon />
    </IconButton>
  </Tooltip>
);

// TODO: Placeholder for search functionality
const SearchToolbar = () => (
  <Tooltip title="Song Search">
    <IconButton>
      <SearchIcon />
    </IconButton>
  </Tooltip>
);

class MusicMarkdownNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsOpen: false,
      isDarkTheme: props.theme.palette.type === 'dark'
    };

    this.settingsAnchorEl = undefined;
  }

  handleSettingsClick = () => {
    this.setState({ settingsOpen: !this.state.settingsOpen });
  }

  handleDarkThemeSwitch = () => {
    this.props.setDarkTheme(!this.state.isDarkTheme);
    this.setState({ isDarkTheme: !this.state.isDarkTheme });
  }

  render() {
    const { settingsOpen, isDarkTheme } = this.state;
    const { classes } = this.props;

    return (
      <AppBar position={'sticky'} key='top-navbar'>
        <Toolbar>
          <Button className={classes.reactRouterHoverInherit} component={Link} to='/'>
            <img className={isDarkTheme ? classes.filter : ''}
              src="music-markdown.svg" width={50} alt="Music Markdown" />
          </Button>
          <div className={classes.grow} />

          <Route path={`/`} component={SearchToolbar} />
          <Route path={['/sandbox', `/:mode(viewer|editor)/${REPO_REGEX}/:branch/:path*`]} component={MusicToolbar} />
          <Route path={`/:mode(viewer|editor)/${REPO_REGEX}/:branch/:path*`} component={BrowseButton} />
          <Route path={`/viewer/${REPO_REGEX}/:branch/:path*`} component={EditButton} />
          <Route path={`/editor/${REPO_REGEX}/:branch/:path*`} component={ViewButton} />

          <IconButton onClick={this.handleSettingsClick} buttonRef={(node) => {
            this.settingsAnchorEl = node;
          }}>
            <SettingsIcon />
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
    );
  }
};

export default connect(undefined, { setDarkTheme })(withStyles(styles, { withTheme: true })(MusicMarkdownNavbar));
