import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import AceEditor from "react-ace";
import { useTranspose } from "../../context/SongPrefsProvider";
import { useDebounce, useRouteParams } from "../../lib/hooks";
import DirectoryBreadcrumbs from "../DirectoryBreadcrumbs";
import EditButtonPanel from "./EditButtonPanel";
import { useEditor } from "./editor";
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
  const { transpose } = useTranspose();
  const { repo, path, branch } = useRouteParams();
  const editor = useEditor(repo, path, branch);
  const debouncedMarkdown = useDebounce(editor.markdown, 250);

  return (
    <>
      <DirectoryBreadcrumbs />
      <Grid container>
        <Grid item xs={12}>
          {editor.loading && <LinearProgress />}
        </Grid>
        <Grid item xs={12}>
          <EditButtonPanel
            format={editor.format}
            dirty={editor.dirty}
            save={editor.save}
            saving={editor.saving}
            revert={editor.revert}
            disabled={editor.loading}
          />
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" square>
            <AceEditor
              mode="markdown"
              theme={theme.palette.mode === "dark" ? "twilight" : "textmate"}
              width="100%"
              maxLines={Infinity}
              onChange={editor.setMarkdown}
              value={editor.markdown}
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
