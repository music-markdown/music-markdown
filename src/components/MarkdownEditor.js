import React, { useEffect, useState } from "react";
import { getContents, putContents } from "../lib/github";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import AceEditor from "react-ace";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";
import DirectoryBreadcrumbs from "./RouterBreadcrumbs";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Fab from "@material-ui/core/Fab";
import GitHubIcon from "@material-ui/icons/GitHub";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";
import MusicMarkdown from "./MusicMarkdown";
import Paper from "@material-ui/core/Paper";
import PhotoFilterIcon from "@material-ui/icons/PhotoFilter";
import SaveIcon from "@material-ui/icons/Save";
import Tooltip from "@material-ui/core/Tooltip";
import asciiTabConvert from "../tools/asciitab";
import classNames from "classnames";
import green from "@material-ui/core/colors/green";
import { useDebounce } from "../lib/hooks";
import { useGlobalStateContext } from "./GlobalState";

import "ace-builds/src-noconflict/mode-markdown"; // eslint-disable-line sort-imports
import "ace-builds/src-noconflict/theme-textmate"; // eslint-disable-line sort-imports
import "ace-builds/src-noconflict/theme-twilight"; // eslint-disable-line sort-imports

const useStyles = makeStyles(theme => ({
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
}));

export default function MarkdownEditor({ match, location }) {
  const classes = useStyles();
  const theme = useTheme();
  const context = useGlobalStateContext();
  const [markdown, setMarkdown] = useState("");
  const debouncedMarkdown = useDebounce(markdown, 250);
  const [sha, setSha] = useState();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { repo, path, branch } = match.params;

  const handleChange = value => {
    setMarkdown(value);
    setIsDirty(true);
    setSuccess(false);
  };

  const handleSave = async () => {
    if (!saving) {
      setSuccess(false);
      setSaving(true);

      const response = await putContents(repo, path, markdown, sha, branch);
      const json = await response.json();

      if (response.status === 200) {
        setSuccess(true);
        setSaving(false);
        setSha(json.content.sha);
      } else {
        setSuccess(false);
        setSaving(false);
      }
    }
  };

  const handleAutoFormat = () => {
    setMarkdown(asciiTabConvert(markdown));
  };

  useEffect(() => {
    async function fetchContents() {
      const json = await getContents(repo, path, branch);
      setIsLoaded(true);
      setMarkdown(json.content);
      setSha(json.sha);
    }
    fetchContents();
  }, [repo, path, branch]);

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
      <DirectoryBreadcrumbs pathname={location.pathname} />
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.toolbar}>
              <Tooltip
                title={
                  context.isValidGithubToken()
                    ? "Save"
                    : "Add a GitHub Token to Enable Saving"
                }
              >
                <span>
                  <Fab
                    disabled={!isDirty || !context.isValidGithubToken()}
                    className={`${buttonClassname} ${classes.fab}`}
                    onClick={handleSave}
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
                <Fab className={classes.fab} onClick={handleAutoFormat}>
                  <PhotoFilterIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Return to Markdown View">
                <Fab component={Link} to={viewerLink} className={classes.fab}>
                  <ExitToAppIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Open in GitHub">
                <Fab href={githubLink} target="_blank" className={classes.fab}>
                  <GitHubIcon />
                </Fab>
              </Tooltip>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <AceEditor
                mode="markdown"
                theme={theme.palette.type === "dark" ? "twilight" : "textmate"}
                width="100%"
                maxLines={Infinity}
                className={classes.editor}
                onChange={handleChange}
                value={markdown}
                editorProps={{ $blockScrolling: true }}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <MusicMarkdown source={debouncedMarkdown}></MusicMarkdown>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
