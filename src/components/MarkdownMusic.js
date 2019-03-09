import React from 'react';
import MarkdownIt from 'markdown-it';
import MarkdownItMeta from 'markdown-it-meta';
import MarkdownItMusic from 'markdown-it-music';
import { YouTubeToggle } from './YouTube';

class MarkdownMusic extends React.Component {
  constructor(props) {
    super(props);

    const musicOpts = {
      transpose: this.props.transpose
    };

    this.md = new MarkdownIt()
      .use(MarkdownItMeta)
      .use(MarkdownItMusic, musicOpts);
  }

  render() {
    this.md.setTranspose(this.props.transpose);
    const html = this.md.render(this.props.source);

    return (
      <div>
        <YouTubeToggle youTubeId={this.md.meta.YouTubeID} />
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
}

export default MarkdownMusic;
