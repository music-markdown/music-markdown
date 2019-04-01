import ContainerDimensions from 'react-container-dimensions';
import React from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MarkdownItMusic from 'markdown-it-music';
import withStyles from '@material-ui/core/styles/withStyles';

import { updateYouTubeId } from '../redux/actions';

const COLUMN_GAP = 20;

const styles = (theme) => ({
  markdownBody: {
    filter: 'invert(100%)'
  },
  columns: {
    columnGap: `${COLUMN_GAP}px`,
    columnRuleWidth: '1px',
    columnRuleStyle: 'dashed',
    columnRuleColor: theme.palette.text.secondary,
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
    const { classes, theme, width, columnCount } = this.props;

    this.md.setTranspose(this.props.transposeAmount)
      .setFontSize(this.props.fontSize)
      .setMaxWidth((width - COLUMN_GAP * (columnCount - 1)) / columnCount);
    const html = this.md.render(this.props.source);

    return (
      <div dangerouslySetInnerHTML={{ __html: html }}
        className={`${theme.palette.type === 'dark' ? classes.markdownBody : ''}`}/>
    );
  }
}

const ContainerizedMusicMarkdown = (props) => (
  <div className={props.classes.columns} style={{ columnCount: props.columnCount }}>
    <ContainerDimensions>
      <MusicMarkdownRender {...props} />
    </ContainerDimensions>
  </div>
);

function mapStateToProps(state) {
  const { transposeAmount, columnCount, fontSize } = state;
  return { transposeAmount, columnCount, fontSize };
}

const MusicMarkdown =
  connect(mapStateToProps, { updateYouTubeId })(withStyles(styles, { withTheme: true })(ContainerizedMusicMarkdown));

export default MusicMarkdown;
