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
      <span dangerouslySetInnerHTML={{__html: this.md.render(this.props.source)}}/>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.queryParams = queryString.parse(this.props.location.search);

    this.state = {
      isLoaded: false,
      markdown: null,
      transpose: parseInt(this.queryParams.transpose, 10) || 0
    };

    this.handleKeyUpEvent = this.handleKeyUpEvent.bind(this);
  }

  componentDidMount() {
    fetch("static/California Dreamin - Mama's and the Papa's.md")
      .then(res => res.text())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            markdown: result
          })
        }
      );
  }

  handleKeyUpEvent(event) {
    if (event.keyCode === 38) {
      this.setState( {
        transpose: this.state.transpose + 1
      });
    }
    else if (event.keyCode === 40) {
      this.setState({
        transpose: this.state.transpose - 1
      });
    }

    this.queryParams.transpose = this.state.transpose + 1;
    history.push(`${this.props.location.pathname}${queryString.stringify(this.queryParams)}`);
  }

  render() {
    const { isLoaded, markdown, transpose } = this.state;
    if (!isLoaded) {
      return (
        <div className="App">
          <div>Loading...</div>
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
