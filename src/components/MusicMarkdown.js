import ContainerDimensions from 'react-container-dimensions';
import ErrorSnackbar from './ErrorSnackbar';
import MarkdownIt from 'markdown-it';
import MarkdownItMusic from 'markdown-it-music';
import React from 'react';
import { connect } from 'react-redux';
import { updateYouTubeId } from '../redux/actions';
import withStyles from '@material-ui/core/styles/withStyles';


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

    this.state = {
      html: '',
      message: null,
      error: false,
    };
  }

  handleClearError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ error: false });
  }

  update = () => {
    const { source, width, columnCount, transposeAmount, fontSize } = this.props;

    this.md.setTranspose(transposeAmount)
      .setFontSize(fontSize)
      .setMaxWidth((width - COLUMN_GAP * (columnCount - 1)) / columnCount);

    try {
      this.setState({ html: this.md.render(source), error: false });
      this.props.updateYouTubeId(this.md.meta.youTubeId);
    } catch (err) {
      console.log(err);
      this.setState({ html: `<pre>${source}</pre>`, message: err.message, error: true });
    }
  }

  componentDidMount = () => {
    this.update();
  }

  componentDidUpdate = (prevProps) => {
    const { source, width, columnCount, transposeAmount, fontSize } = this.props;
    if (prevProps.source === source && prevProps.width === width && prevProps.columnCount === columnCount
        && prevProps.transposeAmount === transposeAmount && prevProps.fontSize === fontSize) {
      return;
    }
    this.update();
  }

  render = () => {
    const { classes, theme } = this.props;
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: this.state.html }}
          className={`${theme.palette.type === 'dark' ? classes.markdownBody : ''}`}/>
        <ErrorSnackbar
          message={this.state.message}
          open={this.state.error}
          handleClose={this.handleClearError} />
      </>
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
