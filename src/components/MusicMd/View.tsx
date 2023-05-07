import styled from "@emotion/styled";
import LinearProgress from "@mui/material/LinearProgress";
import { useFileContent } from "../../context/GitHubApiProvider";
import {
  useColumns,
  useTranspose,
  useZoom,
} from "../../context/SongPrefsProvider";
import { useRouteParams } from "../../lib/hooks";
import Render from "./Render";

const DivRoot = styled("div")({
  flexGrow: 1,
  padding: 8,
});

export default function View() {
  const { repo, path, branch } = useRouteParams();
  const { loading, content } = useFileContent(repo, path, branch);
  const { columns } = useColumns();
  const { transpose } = useTranspose();
  const { zoom } = useZoom();

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <DivRoot>
      <Render
        source={content}
        columns={columns}
        transpose={transpose}
        zoom={zoom}
      />
    </DivRoot>
  );
}
