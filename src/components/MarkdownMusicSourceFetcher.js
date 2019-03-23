import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

import MusicMarkdown from './MusicMarkdown';
import { getContents } from '../lib/github';
import { setTranspose, setColumnCount, setFontSize } from '../redux/actions';

// TODO: Decouple retrieval of source markdown and controlling arguments to MarkdownMusic.
// https://github.com/music-markdown/music-markdown/pull/25#discussion_r259598474
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
    const { owner, repo, path } = this.props.match.params;

    const json = await getContents(owner, repo, path);
    this.setState({
      isLoaded: true,
      markdown: atob(json.content)
    });
  }

  // TODO: Separate the UI component with the fetch logic, we don't necessarily need the fetcher
  // to be a React Component
  render() {
    const { isLoaded, markdown } = this.state;
    if (!isLoaded) {
      return (
        <div className="Markdown">Loading...</div>
      );
    } else {
      return (
        <div className="Markdown">
          <MusicMarkdown source={markdown} />
        </div>
      );
    }
  }
}

export default connect(
  undefined,
  { setTranspose, setColumnCount, setFontSize }
)(MarkdownMusicSourceFetcher);
