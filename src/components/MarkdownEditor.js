import { getContents, putContents } from "../lib/github";

import AceEditor from "react-ace";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";
import DirectoryBreadcrumbs from "./RouterBreadcrumbs";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Fab from "@material-ui/core/Fab";
import GitHubIcon from "@material-ui/icons/GitHub";
import { GlobalStateContext } from "./GlobalState";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";
import MusicMarkdown from "./MusicMarkdown";
import Paper from "@material-ui/core/Paper";
import PhotoFilterIcon from "@material-ui/icons/PhotoFilter";
import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import Tooltip from "@material-ui/core/Tooltip";
import asciiTabConvert from "../tools/asciitab";
import classNames from "classnames";
import green from "@material-ui/core/colors/green";
import withStyles from "@material-ui/core/styles/withStyles";

import "ace-builds/src-noconflict/mode-markdown"; // eslint-disable-line sort-imports
import "ace-builds/src-noconflict/theme-textmate"; // eslint-disable-line sort-imports
import "ace-builds/src-noconflict/theme-twilight"; // eslint-disable-line sort-imports

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 8
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  editor: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: "100%",
    width: "100%"
  },
  fab: {
    margin: theme.spacing(1)
  },
  toolbar: {
    display: "flex",
    padding: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    height: "100%"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  }
});

class MarkdownEditor extends React.Component {
  static contextType = GlobalStateContext;

  state = {
    filename: undefined,
    markdown: "",
    sha: null,
    saving: false,
    success: false,
    isDirty: false
  };

  handleChange = value => {
    this.setState({ markdown: value, isDirty: true, success: false });
  };

  handleSave = async () => {
    if (!this.state.saving) {
      this.setState({ success: false, saving: true });

      const { repo, path, branch } = this.props.match.params;
      const { markdown, sha } = this.state;
      const content = markdown;
      const response = await putContents(repo, path, content, sha, branch);
      const json = await response.json();

      if (response.status === 200) {
        this.setState({ success: true, saving: false, sha: json.content.sha });
      } else {
        this.setState({ success: false, saving: false });
      }
    }
  };

  handleFileNameChange = event => {
    this.setState({ filename: event.target.value });
  };

  handleAutoFormat = () => {
    this.setState(state => ({
      markdown: asciiTabConvert(state.markdown)
    }));
  };

  componentDidMount = async () => {
    const { repo, path, branch } = this.props.match.params;

    const json = await getContents(repo, path, branch);
    this.setState({
      isLoaded: true,
      markdown: json.content,
      sha: json.sha
    });
  };

  render = () => {
    const { saving, success, isLoaded, isDirty } = this.state;
    const { classes, theme, location } = this.props;

    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });

    const parts = location.pathname.split("/");
    parts[4] = "viewer";
    const viewerLink = parts.join("/");

    const githubParts = [parts[2], parts[3], "blob"].concat(parts.slice(5));
    const githubLink = `https://github.com/${githubParts.join("/")}`;

    if (!isLoaded) {
      return <LinearProgress />;
    }

    return (
      <>
        <DirectoryBreadcrumbs pathname={this.props.location.pathname} />
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.toolbar}>
                <Tooltip
                  title={
                    this.context.isValidGithubToken()
                      ? "Save"
                      : "Add a GitHub Token to Enable Saving"
                  }
                >
                  <span>
                    <Fab
                      disabled={!isDirty || !this.context.isValidGithubToken()}
                      className={`${buttonClassname} ${classes.fab}`}
                      onClick={this.handleSave}
                    >
                      {success ? <CheckIcon /> : <SaveIcon />}
                      {saving && (
                        <CircularProgress
                          size={68}
                          className={classes.fabProgress}
                        />
                      )}
                    </Fab>
                  </span>
                </Tooltip>
                <Tooltip title="Auto Format">
                  <Fab className={classes.fab} onClick={this.handleAutoFormat}>
                    <PhotoFilterIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="Return to Markdown View">
                  <Fab component={Link} to={viewerLink} className={classes.fab}>
                    <ExitToAppIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="Open in GitHub">
                  <Fab
                    href={githubLink}
                    target="_blank"
                    className={classes.fab}
                  >
                    <GitHubIcon />
                  </Fab>
                </Tooltip>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <AceEditor
                  mode="markdown"
                  theme={
                    theme.palette.type === "dark" ? "twilight" : "textmate"
                  }
                  width="100%"
                  maxLines={Infinity}
                  className={classes.editor}
                  onChange={this.handleChange}
                  value={this.state.markdown}
                  editorProps={{ $blockScrolling: true }}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <MusicMarkdown source={this.state.markdown}></MusicMarkdown>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </>
    );
  };
}

export default withStyles(styles, { withTheme: true })(MarkdownEditor);
