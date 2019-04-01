import React from 'react';
import AceEditor from 'react-ace';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import MusicMarkdown from './MusicMarkdown';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'brace/theme/monokai';
import green from '@material-ui/core/colors/green';
import withStyles from '@material-ui/core/styles/withStyles';
import { getContents, putContents } from '../lib/github';
import classNames from 'classnames';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 8,
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  editor: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height: '100%',
    width: '100%',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
  buttonSuccess: {
    'backgroundColor': green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
});

class MarkdownEditor extends React.Component {
  state = {
    markdown: '',
    sha: null,
    saving: false,
    success: false
  };

  handleChange = (value) => {
    this.setState({ markdown: value });
  };

  handleButtonClick = async () => {
    if (!this.state.saving) {
      this.setState({ success: false, saving: true });

      const { repo, path, branch } = this.props.match.params;
      const { markdown, sha } = this.state;
      const contents = btoa(markdown);
      const response = await putContents(repo, path, contents, sha, branch);
      const json = await response.json();

      if (response.status === 200) {
        this.setState({ success: true, saving: false, sha: json.content.sha });
      } else {
        this.setState({ success: false, saving: false });
      }
    }
  };

  componentDidMount = async () => {
    const { repo, path } = this.props.match.params;

    const json = await getContents(repo, path);
    this.setState({
      isLoaded: true,
      markdown: atob(json.content),
      sha: json.sha
    });
  }

  render = () => {
    const { saving, success, isLoaded } = this.state;
    const { classes, theme } = this.props;

    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

    if (!isLoaded) {
      return (
        <LinearProgress />
      );
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Fab className={buttonClassname} onClick={this.handleButtonClick}>
                {success ? <CheckIcon /> : <SaveIcon />}
              </Fab>
              {saving && <CircularProgress size={68} className={classes.fabProgress} />}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <AceEditor
                name="brace-editor"
                mode="markdown"
                theme={theme.palette.type === 'dark' ? 'monokai' : 'github'}
                width="100%"
                maxLines={Infinity}
                className={classes.editor}
                onChange={this.handleChange}
                value={this.state.markdown}
                editorProps={{ $blockScrolling: true }} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <MusicMarkdown source={this.state.markdown}></MusicMarkdown>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MarkdownEditor);
