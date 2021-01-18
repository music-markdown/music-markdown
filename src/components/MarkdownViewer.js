import { COLUMN_COUNT_QUERY_KEY, TRANSPOSE_QUERY_KEY } from "../lib/constants";
import { useEffect, useState } from "react";

import LinearProgress from "@material-ui/core/LinearProgress";
import MusicMarkdown from "./MusicMarkdown";
import { getContents } from "../lib/github";
import { makeStyles } from "@material-ui/core/styles";
import queryString from "query-string";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 8,
  },
});

export default function MarkdownViewer({ location, match }) {
  const classes = useStyles();
  const [markdown, setMarkdown] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchContents() {
      const { repo, path, branch } = match.params;
      const json = await getContents(repo, path, branch);
      setMarkdown(json.content);
      setIsLoaded(true);
    }
    fetchContents();
  }, [match.params]);

  const params = queryString.parse(location.search);
  const columnCount = params[COLUMN_COUNT_QUERY_KEY] || "1";
  const transposeAmount = Number(params[TRANSPOSE_QUERY_KEY]) || 0;

  if (!isLoaded) {
    return <LinearProgress />;
  }

  return (
    <div className={classes.root}>
      <MusicMarkdown
        source={markdown}
        columnCount={columnCount}
        transposeAmount={transposeAmount}
      />
    </div>
  );
}
