import styled from "@emotion/styled";
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
import queryString from "query-string";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { Link, useParams } from "react-router-dom";
import { useContents, useGitHubApi } from "../../context/GitHubApiProvider";
import { useSnackbar } from "../../context/SnackbarProvider";
import {
  COLUMN_COUNT_QUERY_KEY,
  TRANSPOSE_QUERY_KEY,
} from "../../lib/constants";
import { putContents } from "../../lib/github";
import { useDebounce } from "../../lib/hooks";
import asciiTabConvert from "../../tools/asciitab";
import DirectoryBreadcrumbs from "../DirectoryBreadcrumbs";
import Render from "./Render";

import "ace-builds/src-noconflict/mode-markdown"; // organize-imports-ignore
import "ace-builds/src-noconflict/theme-textmate"; // organize-imports-ignore
import "ace-builds/src-noconflict/theme-twilight"; // organize-imports-ignore

const ViewPaper = styled(Paper)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  height: "100%",
}));

const FabProgress = styled(CircularProgress)(({ theme }) => ({
  color: green[500],
  position: "absolute",
  top: -6,
  left: -6,
  zIndex: 1,
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export default function Edit({ location }) {
  const theme = useTheme();
  const { gitHubToken } = useGitHubApi();
  const [markdown, setMarkdown] = useState("");
  const debouncedMarkdown = useDebounce(markdown, 250);
  const [sha, setSha] = useState();
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const { repo, path, branch } = useParams();
  const { loading, value, content } = useContents(repo, path, branch);
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const handleChange = (value) => {
    setMarkdown(value);
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!saving) {
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

      setSaving(false);
      if (response.status === 200) {
        successSnackbar("Successfully saved Music Markdown!");
        setSha(json.content.sha);
        setIsDirty(false);
      } else {
        errorSnackbar(`Error saving Music Markdown: ${response.status}`);
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
      <Grid container>
        <Grid item xs={12}>
          <Paper variant="outlined" square>
            <Tooltip
              title={
                gitHubToken ? "Save" : "Add a GitHub Token to Enable Saving"
              }
            >
              <span>
                <StyledFab
                  disabled={!isDirty || !gitHubToken}
                  onClick={handleSave}
                >
                  <SaveIcon />
                  {saving && <FabProgress size={68} />}
                </StyledFab>
              </span>
            </Tooltip>
            <Tooltip title="Auto Format">
              <StyledFab onClick={handleAutoFormat}>
                <PhotoFilterIcon />
              </StyledFab>
            </Tooltip>
            <Tooltip title="Return to Markdown View">
              <StyledFab component={Link} to={viewerLink}>
                <ExitToAppIcon />
              </StyledFab>
            </Tooltip>
            <Tooltip title="Open in GitHub">
              <StyledFab href={githubLink} target="_blank">
                <GitHubIcon />
              </StyledFab>
            </Tooltip>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" square>
            <AceEditor
              mode="markdown"
              theme={theme.palette.mode === "dark" ? "twilight" : "textmate"}
              width="100%"
              maxLines={Infinity}
              onChange={handleChange}
              value={markdown}
              editorProps={{ $blockScrolling: true }}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <ViewPaper variant="outlined" square>
            <Render
              source={debouncedMarkdown}
              columnCount={columnCount}
              transposeAmount={transposeAmount}
            ></Render>
          </ViewPaper>
        </Grid>
      </Grid>
    </>
  );
}
