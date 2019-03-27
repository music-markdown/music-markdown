import ContainerDimensions from 'react-container-dimensions';
import React from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MarkdownItMusic from 'markdown-it-music';
import withStyles from '@material-ui/core/styles/withStyles';
import { create } from 'jss';
import nested from 'jss-nested';

import { updateYouTubeId } from '../redux/actions';

const styles = (theme) => ({
  markdownBody: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary
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

    const colorOrder = [theme.palette.text.primary];

    this.md.setTranspose(this.props.transposeAmount)
      .setColumnCount(this.props.columnCount)
      .setFontSize(this.props.fontSize)
      .setMaxWidth(this.props.width)
      .setTheme({ pallete: theme.palette.type, colorOrder });
    const html = this.md.render(this.props.source);

    // Create a style sheet for <path> and <text> tags, so that abcjs color will render in dark/light theme.
    const jss = create();
    jss.use(nested());
    const sheet = jss.createStyleSheet({
      musicMarkdownTheme: {
        '& path': { fill: theme.palette.text.primary },
        '& text': { fill: theme.palette.text.primary }
      }
    });
    sheet.attach();

    return (
      <div dangerouslySetInnerHTML={{ __html: html }}
        className={`${classes.markdownBody} ${sheet.classes.musicMarkdownTheme}`}/>
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
