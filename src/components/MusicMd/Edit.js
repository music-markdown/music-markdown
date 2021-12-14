import CheckIcon from "@mui/icons-material/Check";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import PhotoFilterIcon from "@mui/icons-material/PhotoFilter";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import makeStyles from "@mui/styles/makeStyles";
import classNames from "classnames";
import queryString from "query-string";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { Link, useParams } from "react-router-dom";
import { useContents, useGitHubApi } from "../../context/GitHubApiProvider";
import {
  COLUMN_COUNT_QUERY_KEY,
  TRANSPOSE_QUERY_KEY,
} from "../../lib/constants";
import { putContents } from "../../lib/github";
import { useDebounce } from "../../lib/hooks";
import asciiTabConvert from "../../tools/asciitab";
import Render from "./Render";
import DirectoryBreadcrumbs from "../RouterBreadcrumbs";

import "ace-builds/src-noconflict/mode-markdown"; // organize-imports-ignore
import "ace-builds/src-noconflict/theme-textmate"; // organize-imports-ignore
import "ace-builds/src-noconflict/theme-twilight"; // organize-imports-ignore

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

export default function Edit({ location }) {
  const classes = useStyles();
  const theme = useTheme();
  const { gitHubToken } = useGitHubApi();
  const [markdown, setMarkdown] = useState("");
  const debouncedMarkdown = useDebounce(markdown, 250);
  const [sha, setSha] = useState();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const { repo, path, branch } = useParams();
  const { loading, value, content } = useContents(repo, path, branch);

  const handleChange = (value) => {
    setMarkdown(value);
    setIsDirty(true);
    setSuccess(false);
  };

  const handleSave = async () => {
    if (!saving) {
      setSuccess(false);
      setSaving(true);

      const response = await putContents(
        repo,
        path,
        markdown,
        sha,
        branch,
        gitHubToken
      );
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
    if (value) {
      setMarkdown(content);
      setSha(value.sha);
    }
  }, [content, value]);

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

  if (loading) {
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
                  gitHubToken ? "Save" : "Add a GitHub Token to Enable Saving"
                }
              >
                <span>
                  <Fab
                    disabled={!isDirty || !gitHubToken}
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
              <Render
                source={debouncedMarkdown}
                columnCount={columnCount}
                transposeAmount={transposeAmount}
              ></Render>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
