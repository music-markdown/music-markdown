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
    filter: theme.palette.type === 'dark' ? 'invert(100%)' : '',
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

    this.md = new MarkdownIt({ html: true })
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
    const { source, width, columnCount, transposeAmount } = this.props;

    this.md.setTranspose(transposeAmount)
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
    const { source, width, columnCount, transposeAmount } = this.props;
    if (prevProps.source === source && prevProps.width === width && prevProps.columnCount === columnCount
        && prevProps.transposeAmount === transposeAmount) {
      return;
    }

    clearTimeout(this.timer);
    this.timer = setTimeout(this.update, 200);
  }

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  }

  render = () => {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.markdownBody} dangerouslySetInnerHTML={{ __html: this.state.html }}/>
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

const MusicMarkdown =
  connect(undefined, { updateYouTubeId })(withStyles(styles, { withTheme: true })(ContainerizedMusicMarkdown));

export default MusicMarkdown;
