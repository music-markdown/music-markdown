import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FormControlLabel from "@mui/material/FormControlLabel";
import GithubTokenDialog from "./GithubTokenDialog";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import MusicToolbar from "./MusicToolbar";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { REPO_REGEX } from "../lib/constants";
import { Route } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import ViewListIcon from "@mui/icons-material/ViewList";
import { alpha } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useGlobalStateContext } from "./GlobalState";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  reactRouterHoverInherit: theme.reactRouterHoverInherit,
  paper: {
    padding: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  filter: {
    filter: theme.palette.mode === "dark" ? "invert(100%)" : "",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
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
      size="large"
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
        size="large"
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
      size="large"
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

  const handleSearchToggle = (event) => {
    if (!searchOpen) {
      setAnchorEl(event.currentTarget);
    }
    setSearchOpen(!searchOpen);
  };

  return (
    <>
      <IconButton
        variant="contained"
        // for some reason, this doesn't work if the layout is too small, e.g. mobile
        onClick={handleSearchToggle}
        size="large"
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

  const handleSettingsToggle = (event) => {
    if (!settingsOpen) {
      setSettingsAnchorEl(event.currentTarget);
    }
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

        <IconButton onClick={handleSettingsToggle} size="large">
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
                        onChange={handleDarkThemeSwitch}
                        checked={context.isDarkTheme()}
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
