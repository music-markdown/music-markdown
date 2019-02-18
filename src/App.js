import React from 'react';
import MarkdownIt from 'markdown-it';
import MarkdownItMusic from 'markdown-it-music'
import queryString from 'query-string';
import { createBrowserHistory } from 'history';
import './App.css';

const history = createBrowserHistory();

class MarkdownMusic extends React.Component {
  constructor(props) {
    super(props);

    let musicOpts = {
      transpose: this.props.transpose
    };

    this.md = MarkdownIt()
      .use(MarkdownItMusic, musicOpts);
  }

  render() {
    this.md.setTranspose(this.props.transpose);
    return (
      <span dangerouslySetInnerHTML={{ __html: this.md.render(this.props.source) }} />
    );
  }
}


class App extends React.Component {
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
    if (!this.state.repos || !this.state.path) {
      return;
    }

    fetch(`https://api.github.com/repos/${this.state.repos}/contents/${this.state.path}`)
      .then(response => response.json())
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            markdown: atob(json.content),
          })
        }
      );
  }

  handleKeyUpEvent(event) {
    if (event.keyCode === this.arrowUpKeyCode) {
      this.setState({
        transpose: this.state.transpose + 1
      });
    }
    else if (event.keyCode === this.arrowDownKeyCode) {
      this.setState({
        transpose: this.state.transpose - 1
      });
    }

    this.queryParams.transpose = this.state.transpose + 1;
    history.push(`${this.props.location.pathname}?${queryString.stringify(this.queryParams)}`);
  }

  render() {
    const { isLoaded, markdown, transpose } = this.state;
    if (!isLoaded) {
      return (
        <div className="App">
          <a href="?repos=music-markdown/almost-in-time&path=California Dreamin' - The Mamas and the Papas.md">
            "music-markdown/almost-in-time: California Dreamin' &ndash; The Mamas and the Papas.md"
          </a>
        </div>
      )
    } else {
      return (
        <div className="App" tabIndex="0" onKeyUp={this.handleKeyUpEvent}>
          <MarkdownMusic source={markdown} transpose={transpose} />
        </div>
      );
    }
  }
}

export default App;
