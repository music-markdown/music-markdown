import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import MusicMarkdown from './MusicMarkdown';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { getContents } from '../lib/github';
import { setTranspose, setColumnCount, setFontSize } from '../redux/actions';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 8,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
});

// TODO: Rename to MarkdownViewer
class MarkdownMusicSourceFetcher extends React.Component {
  constructor(props) {
    super(props);

    this.queryParams = queryString.parse(this.props.location.search);

    this.props.setTranspose(parseInt(this.queryParams.transpose, 10) || 0);
    this.props.setColumnCount(parseInt(this.queryParams.columnCount, 10) || 1);
    this.props.setFontSize(parseInt(this.queryParams.fontSize, 10) || 13);

    this.state = {
      isLoaded: false,
      markdown: null,
    };
  }

  async componentDidMount() {
    const { repo, path } = this.props.match.params;

    const json = await getContents(repo, path);
    this.setState({
      isLoaded: true,
      markdown: atob(json.content)
    });
  }

  render() {
    const { isLoaded, markdown } = this.state;
    const { classes } = this.props;

    if (!isLoaded) {
      return (
        <LinearProgress />
      );
    }

    return (
      <div className={classes.root}>
        <MusicMarkdown source={markdown} />
      </div>
    );
  }
}

export default connect(undefined, { setTranspose, setColumnCount, setFontSize })(
  withStyles(styles, { withTheme: true })(MarkdownMusicSourceFetcher));
