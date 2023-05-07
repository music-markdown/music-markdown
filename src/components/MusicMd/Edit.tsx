import styled from "@emotion/styled";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import PhotoFilterIcon from "@mui/icons-material/PhotoFilter";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { Link, useLocation } from "react-router-dom";
import { useFileContent, useGitHubApi } from "../../context/GitHubApiProvider";
import { useSnackbar } from "../../context/SnackbarProvider";
import { useTranspose } from "../../context/SongPrefsProvider";
import { putContents } from "../../lib/github";
import { useDebounce, useRouteParams } from "../../lib/hooks";
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

export default function Edit() {
  const theme = useTheme();
  const { gitHubToken } = useGitHubApi();
  const [markdown, setMarkdown] = useState<string>("");
  const debouncedMarkdown = useDebounce(markdown, 250);
  const [sha, setSha] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const { repo, path, branch } = useRouteParams();
  const { loading, value, content } = useFileContent(repo, path, branch);
  const { transpose } = useTranspose();
  const { pathname } = useLocation();
  const { successSnackbar, errorSnackbar } = useSnackbar();

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

  const parts = pathname.split("/");
  parts[4] = "viewer";
  const viewerLink = parts.join("/");

  const githubParts = [parts[2], parts[3], "blob"].concat(parts.slice(5));
  const githubLink = `https://github.com/${githubParts.join("/")}`;

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <>
      <DirectoryBreadcrumbs />
      <Grid container>
        <Grid item xs={12}>
          <Paper variant="outlined" square>
            <Box sx={{ padding: theme.spacing(1) }}>
              <Stack spacing={1} direction="row">
                <Tooltip
                  title={
                    gitHubToken ? "Save" : "Add a GitHub Token to Enable Saving"
                  }
                >
                  <span>
                    <Fab
                      disabled={!isDirty || !gitHubToken}
                      onClick={handleSave}
                    >
                      <SaveIcon />
                      {saving && <FabProgress size={68} />}
                    </Fab>
                  </span>
                </Tooltip>
                <Tooltip title="Auto Format">
                  <Fab onClick={handleAutoFormat}>
                    <PhotoFilterIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="Return to Markdown View">
                  <Fab component={Link} to={viewerLink}>
                    <ExitToAppIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="Open in GitHub">
                  <Fab href={githubLink} target="_blank">
                    <GitHubIcon />
                  </Fab>
                </Tooltip>
              </Stack>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" square>
            <AceEditor
              mode="markdown"
              theme={theme.palette.mode === "dark" ? "twilight" : "textmate"}
              width="100%"
              maxLines={Infinity}
              onChange={(value) => {
                setMarkdown(value);
                setIsDirty(true);
              }}
              value={markdown}
              editorProps={{ $blockScrolling: true }}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <ViewPaper variant="outlined" square>
            <Render
              source={debouncedMarkdown}
              columns={1}
              transpose={transpose}
              zoom={1}
            ></Render>
          </ViewPaper>
        </Grid>
      </Grid>
    </>
  );
}
