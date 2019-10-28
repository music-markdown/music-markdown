import { COLUMN_COUNT_QUERY_KEY, TRANSPOSE_QUERY_KEY } from "../lib/constants";
import LinearProgress from "@material-ui/core/LinearProgress";
import MusicMarkdown from "./MusicMarkdown";
import React from "react";
import { getContents } from "../lib/github";
import queryString from "query-string";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 8
  },
  paper: {
    padding: theme.spacing(2)
  }
});

class MarkdownViewer extends React.Component {
  constructor(props) {
    super(props);

    this.queryParams = queryString.parse(this.props.location.search);

    this.state = {
      isLoaded: false,
      markdown: null
    };
  }

  async componentDidMount() {
    const { repo, path, branch } = this.props.match.params;

    const json = await getContents(repo, path, branch);
    this.setState({
      isLoaded: true,
      markdown: json.content
    });
  }

  render() {
    const { isLoaded, markdown } = this.state;
    const { classes, location } = this.props;

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
}

export default withStyles(styles, { withTheme: true })(MarkdownViewer);
