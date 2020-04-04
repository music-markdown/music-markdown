import React, { useState } from "react";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GithubTokenDialog from "./GithubTokenDialog";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import MusicToolbar from "./MusicToolbar";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { REPO_REGEX } from "../lib/constants";
import { Route } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import ViewListIcon from "@material-ui/icons/ViewList";
import { useGlobalStateContext } from "./GlobalState";

const useStyles = makeStyles((theme) => ({
  reactRouterHoverInherit: theme.reactRouterHoverInherit,
  paper: {
    padding: `${theme.spacing(1)}px`,
  },
  grow: {
    flexGrow: 1,
  },
  filter: {
    filter: theme.palette.type === "dark" ? "invert(100%)" : "",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    width: "100%",
  },
}));

const BrowseButton = ({ match }) => (
  <Tooltip title="Song List View">
    <IconButton
      component={Link}
      to={`/repos/${match.params.repo}/browser/${match.params.branch}/`}
    >
      <ViewListIcon />
    </IconButton>
  </Tooltip>
);

const EditButton = ({ match }) => (
  <Tooltip title="Edit Song">
    <span>
      <IconButton
        component={Link}
        to={`/repos/${match.params.repo}/editor/${match.params.branch}/${match.params.path}`}
      >
        <EditIcon />
      </IconButton>
    </span>
  </Tooltip>
);

const ViewButton = ({ match }) => (
  <Tooltip title="Markdown View">
    <IconButton
      component={Link}
      to={`/repos/${match.params.repo}/viewer/${match.params.branch}/${match.params.path}`}
    >
      <ExitToAppIcon />
    </IconButton>
  </Tooltip>
);

// TODO: Placeholder for search functionality
const SearchToolbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState();
  const [searchOpen, setSearchOpen] = useState(false);

  function handleSearchToggle() {
    setSearchOpen(!searchOpen);
  }

  return (
    <>
      <IconButton
        variant="contained"
        buttonRef={setAnchorEl}
        onClick={handleSearchToggle} // for some reason, this doesn't work if the layout is too small, e.g. mobile
      >
        <SearchIcon />
      </IconButton>
      {searchOpen ? (
        <ClickAwayListener onClickAway={handleSearchToggle}>
          <Popper
            id="search-popper"
            anchorEl={anchorEl}
            placement="bottom-end"
            open={searchOpen}
          >
            <Paper className={classes.paper}>
              <InputBase
                className={classes.search}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </Paper>
          </Popper>
        </ClickAwayListener>
      ) : null}
    </>
  );
};

export default function MusicMarkdownNavbar() {
  const classes = useStyles();
  const context = useGlobalStateContext();
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState();

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleApiKeyDialogOpen = () => {
    setApiKeyDialogOpen(true);
    setSettingsOpen(false);
  };

  const handleApiKeyDialogClose = () => {
    setApiKeyDialogOpen(false);
    setSettingsOpen(false);
  };

  const handleDarkThemeSwitch = () => {
    context.toggleTheme();
  };

  return (
    <AppBar position={"sticky"} key="top-navbar">
      <Toolbar>
        <Button
          className={classes.reactRouterHoverInherit}
          component={Link}
          to="/"
        >
          <img
            className={classes.filter}
            src="music-markdown.svg"
            width={50}
            alt="Music Markdown"
          />
        </Button>
        <div className={classes.grow} />

        <Route
          path={`${REPO_REGEX}/:mode/:branch/:path*`}
          component={SearchToolbar}
        />
        <Route
          path={[
            "/sandbox",
            `${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`,
          ]}
          component={MusicToolbar}
        />
        <Route
          path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
          component={BrowseButton}
        />
        <Route
          path={`${REPO_REGEX}/viewer/:branch/:path*`}
          component={EditButton}
        />
        <Route
          path={`${REPO_REGEX}/editor/:branch/:path*`}
          component={ViewButton}
        />

        <IconButton
          onClick={handleSettingsToggle}
          buttonRef={setSettingsAnchorEl}
        >
          <SettingsIcon />
        </IconButton>
        <Popper
          id="settings-popper"
          open={settingsOpen}
          anchorEl={settingsAnchorEl}
          placement="bottom-end"
        >
          <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={handleSettingsToggle}>
              <MenuList>
                <MenuItem>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked={context.isDarkTheme()}
                        onChange={handleDarkThemeSwitch}
                        value="darkTheme"
                      />
                    }
                    label="Toggle Dark Mode?"
                  />
                </MenuItem>
                <MenuItem onClick={handleApiKeyDialogOpen}>
                  Set GitHub Token
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </Toolbar>
      <GithubTokenDialog
        open={apiKeyDialogOpen}
        handleClose={handleApiKeyDialogClose}
      ></GithubTokenDialog>
    </AppBar>
  );
}
