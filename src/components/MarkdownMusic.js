import ContainerDimensions from 'react-container-dimensions';
import React from 'react';
import MarkdownIt from 'markdown-it';
import MarkdownItMusic from 'markdown-it-music';
import { YouTubeToggle } from './YouTube';

class MarkdownMusicRender extends React.Component {
  constructor(props) {
    super(props);

    this.md = new MarkdownIt()
      .use(MarkdownItMusic);
  }

  render() {
    this.md.setTranspose(this.props.transpose);
    this.md.setMaxWidth(this.props.width);
    const html = this.md.render(this.props.source);

    return (
      <div>
        <YouTubeToggle youTubeId={this.md.meta.youTubeId} />
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
}

const MarkdownMusic = ({ source, transpose }) => (
  <ContainerDimensions>
    <MarkdownMusicRender source={source} transpose={transpose} />
  </ContainerDimensions>
);

export default MarkdownMusic;
