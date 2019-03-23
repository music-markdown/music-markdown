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

class MusicMarkdown extends React.Component {
  constructor(props) {
    super(props);

    this.md = new MarkdownIt()
      .use(MarkdownItMusic);
  }

  componentDidMount() {
    this.props.updateYouTubeId(this.md.meta.youTubeId);
  }

  render() {
    this.md.setTranspose(this.props.transposeAmount);
    this.md.setColumnCount(this.props.columnCount);
    this.md.setFontSize(this.props.fontSize);
    this.md.setMaxWidth(this.props.width);
    const html = this.md.render(this.props.source);

    const { classes, theme } = this.props;

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

export default connect(mapStateToProps, { updateYouTubeId })(withStyles(styles, { withTheme: true })(MusicMarkdown));
