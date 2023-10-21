import styled from "@emotion/styled";
import LinearProgress from "@mui/material/LinearProgress";
import { useCallback, useEffect } from "react";
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
  const { columns, setColumns } = useColumns();
  const { transpose } = useTranspose();
  const { zoom } = useZoom();

  const handleKeyPress = useCallback(
    (event: any) => {
      if (event.key === "F2" && columns > 1) {
        setColumns(columns - 1);
      }
      if (event.key === "F3" && columns < 8) {
        setColumns(columns + 1);
      }
    },
    [columns, setColumns]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
