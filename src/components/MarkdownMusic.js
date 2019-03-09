import React from 'react';
import MarkdownIt from 'markdown-it';
import MarkdownItMusic from 'markdown-it-music';
import { YouTubeToggle } from './YouTube';

class MarkdownMusic extends React.Component {
  constructor(props) {
    super(props);

    this.md = new MarkdownIt()
      .use(MarkdownItMusic);
  }

  render() {
    this.md.setTranspose(this.props.transpose);
    const html = this.md.render(this.props.source);

    return (
      <div>
        <YouTubeToggle youTubeId={this.md.meta.youTubeId} />
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
}

export default MarkdownMusic;
