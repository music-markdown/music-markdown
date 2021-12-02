import { useEffect, useState } from "react";
import { getContents, putContents } from "../lib/github";
import { useTheme } from "@mui/material/styles";

import makeStyles from '@mui/styles/makeStyles';

import AceEditor from "react-ace";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import DirectoryBreadcrumbs from "./RouterBreadcrumbs";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Fab from "@mui/material/Fab";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import MusicMarkdown from "./MusicMarkdown";
import Paper from "@mui/material/Paper";
import PhotoFilterIcon from "@mui/icons-material/PhotoFilter";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";
import asciiTabConvert from "../tools/asciitab";
import classNames from "classnames";
import { useDebounce } from "../lib/hooks";
import { useGlobalStateContext } from "./GlobalState";
import queryString from "query-string";
import "ace-builds/src-noconflict/mode-markdown"; // eslint-disable-line sort-imports

import "ace-builds/src-noconflict/theme-textmate"; // eslint-disable-line sort-imports
import "ace-builds/src-noconflict/theme-twilight"; // eslint-disable-line sort-imports
import { COLUMN_COUNT_QUERY_KEY, TRANSPOSE_QUERY_KEY } from "../lib/constants";
import { green } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 8,
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  editor: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: "100%",
    width: "100%",
  },
  fab: {
    margin: theme.spacing(1),
  },
  toolbar: {
    display: "flex",
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    height: "100%",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
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

  const handleChange = (value) => {
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

  const params = queryString.parse(location.search);
  const columnCount = params[COLUMN_COUNT_QUERY_KEY] || "1";
  const transposeAmount = Number(params[TRANSPOSE_QUERY_KEY]) || 0;

  const buttonClassname = classNames({
    [classes.buttonSuccess]: success,
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
                theme={theme.palette.mode === "dark" ? "twilight" : "textmate"}
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
              <MusicMarkdown
                source={debouncedMarkdown}
                columnCount={columnCount}
                transposeAmount={transposeAmount}
              ></MusicMarkdown>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
