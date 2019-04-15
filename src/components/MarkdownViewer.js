import { setFontSize, setTranspose } from '../redux/actions';
import LinearProgress from '@material-ui/core/LinearProgress';
import MusicMarkdown from './MusicMarkdown';
import React from 'react';
import { connect } from 'react-redux';
import { getContents } from '../lib/github';
import queryString from 'query-string';
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

class MarkdownViewer extends React.Component {
  constructor(props) {
    super(props);

    this.queryParams = queryString.parse(this.props.location.search);

    this.props.setTranspose(parseInt(this.queryParams.transpose, 10) || 0);
    this.props.setFontSize(parseInt(this.queryParams.fontSize, 10) || 13);

    this.state = {
      isLoaded: false,
      markdown: null,
    };
  }

  async componentDidMount() {
    const { repo, path, branch } = this.props.match.params;

    const json = await getContents(repo, path, branch);
    this.setState({
      isLoaded: true,
      markdown: json.content ? atob(json.content) : ''
    });
  }

  render() {
    const { isLoaded, markdown } = this.state;
    const { classes, location } = this.props;

    const params = queryString.parse(location.search);
    const columnCount = params.columnCount || 1;

    if (!isLoaded) {
      return (
        <LinearProgress />
      );
    }

    return (
      <div className={classes.root}>
        <MusicMarkdown source={markdown} columnCount={columnCount} />
      </div>
    );
  }
}

export default connect(undefined, { setTranspose, setFontSize })(
  withStyles(styles, { withTheme: true })(MarkdownViewer));
