import ContainerDimensions from 'react-container-dimensions';
import React from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MarkdownItMusic from 'markdown-it-music';
import withStyles from '@material-ui/core/styles/withStyles';

import { updateYouTubeId } from '../redux/actions';

const styles = () => ({
  markdownBody: {
    filter: 'invert(100%)'
  },
});

class MusicMarkdownRender extends React.Component {
  constructor(props) {
    super(props);

    this.md = new MarkdownIt()
      .use(MarkdownItMusic);
  }

  componentDidMount() {
    this.props.updateYouTubeId(this.md.meta.youTubeId);
  }

  render() {
    const { classes, theme } = this.props;

    this.md.setTranspose(this.props.transposeAmount)
      .setColumnCount(this.props.columnCount)
      .setFontSize(this.props.fontSize)
      .setMaxWidth(this.props.width);
    const html = this.md.render(this.props.source);

    return (
      <div dangerouslySetInnerHTML={{ __html: html }}
        className={`${theme.palette.type === 'dark' ? classes.markdownBody : ''}`}/>
    );
  }
}

function mapStateToProps(state) {
  const { transposeAmount, columnCount, fontSize } = state;
  return { transposeAmount, columnCount, fontSize };
}

const ConnectMarkdownMusicRender =
  connect(mapStateToProps, { updateYouTubeId })(withStyles(styles, { withTheme: true })(MusicMarkdownRender));

const MusicMarkdown = ({ source }) => (
  <ContainerDimensions>
    <ConnectMarkdownMusicRender source={source} />
  </ContainerDimensions>
);

export default MusicMarkdown;
