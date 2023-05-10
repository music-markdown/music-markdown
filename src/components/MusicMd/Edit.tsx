import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { useFileContent, useGitHubApi } from "../../context/GitHubApiProvider";
import { useSnackbar } from "../../context/SnackbarProvider";
import { useTranspose } from "../../context/SongPrefsProvider";
import { putContents } from "../../lib/github";
import { useDebounce, useRouteParams } from "../../lib/hooks";
import asciiTabConvert from "../../tools/asciitab";
import DirectoryBreadcrumbs from "../DirectoryBreadcrumbs";
import EditButtonPanel from "./EditButtonPanel";
import Render from "./Render";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-twilight";

const ViewPaper = styled(Paper)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  height: "100%",
}));

export default function Edit() {
  const theme = useTheme();
  const { gitHubToken } = useGitHubApi();
  const [markdown, setMarkdown] = useState<string>("");
  const debouncedMarkdown = useDebounce(markdown, 250);
  const [sha, setSha] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [dirty, setDirty] = useState<boolean>(false);
  const { repo, path, branch } = useRouteParams();
  const { loading, value, content } = useFileContent(repo, path, branch);
  const { transpose } = useTranspose();
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
        // setMarkdown(json.content)
        setSha(json.content.sha);
        setDirty(false);
      } else {
        errorSnackbar(`Error saving Music Markdown: ${response.status}`);
      }
    }
  };

  const handleAutoFormat = () => {
    setMarkdown(asciiTabConvert(markdown));
  };

  useEffect(() => {
    const cache = sessionStorage.getItem(
      `${value.sha}/${repo}/${branch}/${path}`
    );
    setDirty(cache !== markdown);
  }, [markdown, value, repo, branch, path]);

  useEffect(() => {
    if (value) {
      sessionStorage.setItem(`${value.sha}/${repo}/${branch}/${path}`, content);
      setMarkdown(content);
      setSha(value.sha);
    }
  }, [content, value, repo, branch, path]);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <>
      <DirectoryBreadcrumbs />
      <Grid container>
        <Grid item xs={12}>
          <EditButtonPanel
            format={handleAutoFormat}
            dirty={dirty}
            save={handleSave}
            saving={saving}
          />
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
                setDirty(true);
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
