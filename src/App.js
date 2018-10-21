import React from 'react';
import MarkdownIt from 'markdown-it';
// import abc from 'abcjs';
import MarkdownItMusic from 'markdown-it-music'
import './App.css';


class MarkdownMusic extends React.Component {
  constructor(props) {
    super(props);

    this.md = MarkdownIt()
      .use(MarkdownItMusic);
  }

  render() {
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
      markdown: null
    };
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

  render() {
    const { isLoaded, markdown } = this.state;
    if (!isLoaded) {
      return (
        <div className="App">
          <div>Loading...</div>
        </div>
      )
    } else {
      return (
        <div className="App">
          <MarkdownMusic source={markdown} />
        </div>
      );
    }
  }
}

export default App;
