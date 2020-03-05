import React, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GithubTokenDialog from "./GithubTokenDialog";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import MusicToolbar from "./MusicToolbar";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { REPO_REGEX } from "../lib/constants";
import { Route } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import ViewListIcon from "@material-ui/icons/ViewList";
import { getSearchIndexedContentsValues } from "../lib/fuzzySearch";
import { makeStyles } from "@material-ui/core/styles";
import { useGlobalStateContext } from "./GlobalState";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  reactRouterHoverInherit: theme.reactRouterHoverInherit,
  paper: {
    padding: `${theme.spacing(1)}px`
  },
  grow: {
    flexGrow: 1
  },
  filter: {
    filter: theme.palette.type === "dark" ? "invert(100%)" : ""
  },
  searchResults: {
    display: "flex",
    justifyContent: "flex-end",
    padding: `${theme.spacing(1)}px`,
    width: "100%",
    position: "relative"
  },
  inputRoot: {
    color: "inherit"
  }
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

// TODO: Rewrite this using JSON instead of a string for files
const SearchToolbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);

  async function handleTextChange(event) {
    const query = event.target.value;
    const results = await getSearchIndexedContentsValues(query);
    setSearchResults(results);
  }

  const navigateToFile = event => {
    const file = event.target.textContent;
    history.push(createFilePath(file));
  };

  function createFilePath(fileId) {
    const values = fileId.split("/");
    const owner = values.shift();
    const repo = values.shift();
    const branch = values.shift();
    const file = values.join("");
    return `/repos/${owner}/${repo}/viewer/${branch}/${file}`;
  }

  // TODO: Make this a togglable button
  return (
    <>
      <div className={classes.searchResults}>
        <Box flexGrow={1}>
          <Autocomplete
            options={searchResults}
            onClose={navigateToFile}
            getOptionLabel={option => option}
            renderInput={params => (
              <TextField
                {...params}
                style={{ width: "100%" }}
                label="Search..."
                variant="filled"
                onChange={handleTextChange}
                onClose={navigateToFile}
              />
            )}
          />
        </Box>
      </div>
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
            `${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`
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
          <Paper className={classes.paper} elevation={10}>
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
