import LinearProgress from "@mui/material/LinearProgress";
import makeStyles from "@mui/styles/makeStyles";
import queryString from "query-string";
import { useParams } from "react-router-dom";
import { useContents } from "../../context/GitHubApiProvider";
import {
  COLUMN_COUNT_QUERY_KEY,
  TRANSPOSE_QUERY_KEY,
} from "../../lib/constants";
import Render from "./Render";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 8,
  },
});

export default function View({ location }) {
  const classes = useStyles();
  const { repo, path, branch } = useParams();
  const { loading, content } = useContents(repo, path, branch);

  const params = queryString.parse(location.search);
  const columnCount = params[COLUMN_COUNT_QUERY_KEY] || "1";
  const transposeAmount = Number(params[TRANSPOSE_QUERY_KEY]) || 0;

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <div className={classes.root}>
      <Render
        source={content}
        columnCount={columnCount}
        transposeAmount={transposeAmount}
      />
    </div>
  );
}
