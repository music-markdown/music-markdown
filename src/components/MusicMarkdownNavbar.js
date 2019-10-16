import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { GlobalStateContext } from './GlobalState';
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
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  reactRouterHoverInherit: theme.reactRouterHoverInherit,
  paper: {
    padding: `${theme.spacing(1)}px`,
  },
  grow: {
    flexGrow: 1
  },
  filter: {
    filter: theme.palette.type === 'dark' ? 'invert(100%)' : '',
  },
});

const BrowseButton = ({ match }) => (
  <Tooltip title="Song List View">
    <IconButton component={Link} to={`/repos/${match.params.repo}/browser/${match.params.branch}/`}>
      <ViewListIcon />
    </IconButton>
  </Tooltip>
);

const EditButton = ({ match }) => (
  <Tooltip title="Edit Song">
    <IconButton component={Link} to={`/repos/${match.params.repo}/editor/${match.params.branch}/${match.params.path}`}>
      <EditIcon />
    </IconButton>
  </Tooltip>
);

const ViewButton = ({ match }) => (
  <Tooltip title="Markdown View">
    <IconButton component={Link} to={`/repos/${match.params.repo}/viewer/${match.params.branch}/${match.params.path}`}>
      <ExitToAppIcon />
    </IconButton>
  </Tooltip>
);

// TODO: Placeholder for search functionality
const SearchToolbar = () => (
  <IconButton>
    <SearchIcon />
  </IconButton>
);

class MusicMarkdownNavbar extends React.Component {
  static contextType = GlobalStateContext;

  constructor(props) {
    super(props);

    this.state = {
      settingsOpen: false,
    };

    this.settingsAnchorEl = undefined;
  }

  handleSettingsClick = () => {
    this.setState({ settingsOpen: !this.state.settingsOpen });
  }

  handleDarkThemeSwitch = () => {
    this.context.toggleTheme();
  }

  render() {
    const { settingsOpen } = this.state;
    const { classes } = this.props;

    return (
      <AppBar position={'sticky'} key='top-navbar'>
        <Toolbar>
          <Button className={classes.reactRouterHoverInherit} component={Link} to='/'>
            <img className={classes.filter}
              src="music-markdown.svg" width={50} alt="Music Markdown" />
          </Button>
          <div className={classes.grow} />

          <Route path={`${REPO_REGEX}/:mode/:branch/:path*`} component={SearchToolbar} />
          <Route path={['/sandbox', `${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`]} component={MusicToolbar} />
          <Route path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`} component={BrowseButton} />
          <Route path={`${REPO_REGEX}/viewer/:branch/:path*`} component={EditButton} />
          <Route path={`${REPO_REGEX}/editor/:branch/:path*`} component={ViewButton} />

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
                      defaultChecked={this.context.isDarkTheme()}
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

export default withStyles(styles, { withTheme: true })(MusicMarkdownNavbar);
