import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import MarkdownIt from "markdown-it";
import MarkdownItMusic from "markdown-it-music";
import { useEffect, useRef, useState } from "react";
import { useYouTubeId } from "../../context/YouTubeIdProvider";
import { useContainerDimensions } from "../../lib/hooks";
import ErrorSnackbar from "../ErrorSnackbar";

const COLUMN_GAP = 20;

const useStyles = makeStyles((theme) => ({
  columns: {
    columnGap: `${COLUMN_GAP}px`,
    columnRuleWidth: "1px",
    columnRuleStyle: "dashed",
    columnRuleColor: theme.palette.text.secondary,
  },
}));

const MusicMarkdownRender = ({ source, width, columns, transpose, zoom }) => {
  const theme = useTheme();
  const { setYouTubeId } = useYouTubeId();
  const [html, setHtml] = useState("");
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);

  const handleClearError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  useEffect(() => {
    const md = new MarkdownIt({ html: true }).use(MarkdownItMusic);
    md.setTranspose(transpose);
    md.setTheme(theme.palette.mode);
    md.setMaxWidth((width - COLUMN_GAP * (columns - 1)) / columns / zoom);

    try {
      setHtml(md.render(source));
      setError(false);
      setYouTubeId(md.meta.youTubeId);
    } catch (err) {
      console.log(err);
      setHtml(`<pre>${source}</pre>`);
      setMessage(err.message);
      setError(true);
    }
  }, [
    setYouTubeId,
    source,
    width,
    columns,
    transpose,
    zoom,
    theme.palette.mode,
  ]);

  // TODO: Replace this hack with an iframe.
  var script = /<script>([.\s\S]*)<\/script>/gm.exec(html);
  if (script) {
    // eslint-disable-next-line no-eval
    window.eval(script[1]);
  }

  return (
    <>
      {/* TODO: Replace this hack with an iframe. */}
      <div
        className={`mmd-${theme.palette.mode}`}
        style={{ zoom }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ErrorSnackbar
        message={message}
        open={error}
        handleClose={handleClearError}
      />
    </>
  );
};

export default function Render(props) {
  const classes = useStyles();
  const componentRef = useRef();
  const { width } = useContainerDimensions(componentRef);

  return (
    <div
      className={classes.columns}
      style={{ columns: props.columns }}
      ref={componentRef}
    >
      <MusicMarkdownRender width={width} {...props} />
    </div>
  );
}
