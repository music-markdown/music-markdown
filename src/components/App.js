import React from 'react';
import MarkdownIt from 'markdown-it';
import MarkdownItMusic from 'markdown-it-music';
import queryString from 'query-string';
import { createBrowserHistory } from 'history';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.scss';

const history = createBrowserHistory();

class MarkdownMusic extends React.Component {
  constructor(props) {
    super(props);

    const musicOpts = {
      transpose: this.props.transpose
    };

    this.md = MarkdownIt() // eslint-disable-line new-cap
      .use(MarkdownItMusic, musicOpts);
  }

  render() {
    this.md.setTranspose(this.props.transpose);
    return (
      <span dangerouslySetInnerHTML={{ __html: this.md.render(this.props.source) }} />
    );
  }
}

class Markdown extends React.Component {
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

  componentDidMount() {
    const owner = this.props.match.params.owner;
    const repo = this.props.match.params.repo;
    const path = this.props.match.params.path;

    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
      .then((response) => response.json())
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            markdown: atob(json.content),
          });
        }
      );
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

const Home = () => (
  <div>
    <h2>Home</h2>
    <Link to="/repos/music-markdown/almost-in-time/contents/California Dreamin' - The Mamas and the Papas.md">
      California Dreamin
    </Link>
  </div>
);

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/repos/:owner/:repo/contents/:path" component={Markdown} />
    </div>
  </Router>
);

export default App;
