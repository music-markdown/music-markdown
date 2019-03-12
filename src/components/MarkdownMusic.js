import ContainerDimensions from 'react-container-dimensions';
import React from 'react';
import { connect } from 'react-redux';
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
    this.md.setTranspose(this.props.transposeAmount);
    this.md.setColumnCount(this.props.columnCount);
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

function mapStateToProps(state) {
  const { transposeAmount, columnCount } = state;
  return { transposeAmount, columnCount };
}

const ConnectMarkdownMusicRender = connect(mapStateToProps)(MarkdownMusicRender);

const MarkdownMusic = ({ source }) => (
  <ContainerDimensions>
    <ConnectMarkdownMusicRender source={source} />
  </ContainerDimensions>
);

export default MarkdownMusic;
