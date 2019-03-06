import React from 'react';
import { createBrowserHistory } from 'history';
import MarkdownMusic from './MarkdownMusic';
import queryString from 'query-string';

const history = createBrowserHistory();

// TODO: Decouple retrieval of source markdown and controlling arguments to MarkdownMusic.
// https://github.com/music-markdown/music-markdown/pull/25#discussion_r259598474
class MarkdownMusicSourceFetcher extends React.Component {
  arrowUpKeyCode = 38;
  arrowDownKeyCode = 40;

  constructor(props) {
    super(props);

    this.queryParams = queryString.parse(this.props.location.search);

    this.state = {
      isLoaded: false,
      markdown: null,
      transpose: parseInt(this.queryParams.transpose, 10) || 0,
      repos: this.queryParams.repos,
      path: this.queryParams.path,
    };

    this.handleKeyUpEvent = this.handleKeyUpEvent.bind(this);
  }

  async componentDidMount() {
    const owner = this.props.match.params.owner;
    const repo = this.props.match.params.repo;
    const path = this.props.match.params.path;

    const json = await getContents(owner, repo, path);
    this.setState({
      isLoaded: true,
      markdown: atob(json.content)
    });
  }

  handleKeyUpEvent(event) {
    if (event.keyCode === this.arrowUpKeyCode) {
      this.setState({
        transpose: this.state.transpose + 1
      });
    } else if (event.keyCode === this.arrowDownKeyCode) {
      this.setState({
        transpose: this.state.transpose - 1
      });
    }

    this.queryParams.transpose = this.state.transpose + 1;
    history.push(`#${this.props.location.pathname}?${queryString.stringify(this.queryParams)}`);
  }

  // TODO: Separate the UI component with the fetch logic, we don't necessarily need the fetcher
  // to be a React Component
  render() {
    const { isLoaded, markdown, transpose } = this.state;
    if (!isLoaded) {
      return (
        <div className="Markdown">Loading...</div>
      );
    } else {
      return (
        <div className="Markdown" tabIndex="0" onKeyUp={this.handleKeyUpEvent}>
          <MarkdownMusic source={markdown} transpose={transpose} />
        </div>
      );
    }
  }
}

/**
 * Returns a Promise of the contents of a file or directory in a GitHub repository.
 * See https://developer.github.com/v3/repos/contents/#get-contents
 * @param {string} owner Account owner of the repo
 * @param {string} repo Repo name
 * @param {string} path The directory or file to retrieve
 */
async function getContents(owner, repo, path) {
  const normalizedUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const response = await fetch(normalizedUrl);
  return response.json();
}

export default MarkdownMusicSourceFetcher;
