import React from 'react';
import MarkdownIt from 'markdown-it';
// import abc from 'abcjs';
import MarkdownItMusic from 'markdown-it-music'
import './App.css';


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

    this.state = {
      isLoaded: false,
      markdown: null,
      transpose: 0
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
    if (event.key === "ArrowUp") {
      this.setState( {
        transpose: this.state.transpose + 1
      });
    }
    else if (event.key === "ArrowDown") {
      this.setState({
        transpose: this.state.transpose - 1
      });
    }
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
