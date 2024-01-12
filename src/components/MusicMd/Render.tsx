import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import MarkdownIt from "markdown-it";
import MarkdownItMusic from "markdown-it-music";
import { FC, useEffect, useRef, useState } from "react";
import { useSnackbar } from "../../context/SnackbarProvider";
import { useYouTubeId } from "../../context/YouTubeIdProvider";
import { useContainerDimensions } from "../../lib/hooks";

const COLUMN_GAP = 20;

const DivColumns = styled("div")(({ theme }) => ({
  columnGap: `${COLUMN_GAP}px`,
  columnRuleWidth: "1px",
  columnRuleStyle: "dashed",
  columnRuleColor: theme.palette.text.secondary,
}));

interface MusicMarkdownRenderProps {
  source: string;
  width: number;
  columns: number;
  transpose: number;
}

interface MarkdownItWithMMD extends MarkdownIt {
  setTranspose: (transpose: number) => void;
  setTheme: (theme: string) => void;
  setMaxWidth: (maxWidth: number) => void;
  meta: {
    youTubeId: string;
  };
}

const MusicMarkdownRender: FC<MusicMarkdownRenderProps> = ({
  source,
  width,
  columns,
  transpose,
}) => {
  const theme = useTheme();
  const { setYouTubeId } = useYouTubeId();
  const [html, setHtml] = useState("");
  const { errorSnackbar } = useSnackbar();

  useEffect(() => {
    const md = new MarkdownIt({ html: true }).use(
      MarkdownItMusic,
    ) as MarkdownItWithMMD;
    md.setTranspose(transpose);
    md.setTheme(theme.palette.mode);
    md.setMaxWidth((width - COLUMN_GAP * (columns - 1)) / columns);

    try {
      setHtml(md.render(source));
      setYouTubeId(md.meta.youTubeId);
    } catch (err: any) {
      console.log(err);
      setHtml(`<pre>${source}</pre>`);
      errorSnackbar(err.message);
    }
  }, [
    setYouTubeId,
    source,
    width,
    columns,
    transpose,
    theme.palette.mode,
    errorSnackbar,
  ]);

  // TODO: Replace this hack with an iframe.
  var script = /<script>([.\s\S]*)<\/script>/gm.exec(html);
  if (script) {
    // eslint-disable-next-line no-eval
    window.eval(script[1]);
  }

  /* TODO: Replace this hack with an iframe. */
  return (
    <div
      className={`mmd-${theme.palette.mode}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

interface RenderProps {
  source: string;
  columns: number;
  zoom: number;
  transpose: number;
}

export default function Render(props: RenderProps) {
  const componentRef = useRef(null);
  const { zoom } = props;
  const { width } = useContainerDimensions(componentRef, zoom);

  return (
    <div
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: "0 0",
        width: `${100 / zoom}%`,
      }}
    >
      <DivColumns style={{ columns: props.columns }} ref={componentRef}>
        <MusicMarkdownRender width={width} {...props} />
      </DivColumns>
    </div>
  );
}
