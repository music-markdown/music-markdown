import React from 'react';
import MarkdownIt from 'markdown-it';
import MarkdownItMusic from 'markdown-it-music';

class MarkdownMusic extends React.Component {
  constructor(props) {
    super(props);

    const musicOpts = {
      transpose: this.props.transpose
    };

    this.md = new MarkdownIt()
      .use(MarkdownItMusic, musicOpts);
  }

  render() {
    this.md.setTranspose(this.props.transpose);
    return (
      <span dangerouslySetInnerHTML={{ __html: this.md.render(this.props.source) }} />
    );
  }
}

export default MarkdownMusic;
