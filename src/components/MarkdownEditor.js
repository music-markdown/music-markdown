import { getContents, putContents } from '../lib/github';
import AceEditor from 'react-ace';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import MusicMarkdown from './MusicMarkdown';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
import withStyles from '@material-ui/core/styles/withStyles';
import 'brace/mode/markdown'; // eslint-disable-line sort-imports
import 'brace/theme/github'; // eslint-disable-line sort-imports
import 'brace/theme/monokai'; // eslint-disable-line sort-imports

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
  wrapper: {
    position: 'relative',
  },
  editor: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height: '100%',
    width: '100%',
  },
  filename: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  paper: {
    display: 'flex',
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
    filename: undefined,
    markdown: '',
    sha: null,
    saving: false,
    success: false,
    isDirty: false
  };

  handleChange = (value) => {
    this.setState({ markdown: value, isDirty: true, success: false });
  };

  handleSave = async () => {
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

  handleFileNameChange = (event) => {
    this.setState({ filename: event.target.value });
  }

  componentDidMount = async () => {
    const { repo, path, branch } = this.props.match.params;

    const json = await getContents(repo, path, branch);
    this.setState({
      isLoaded: true,
      markdown: json.content ? atob(json.content) : '',
      sha: json.sha
    });
  }

  render = () => {
    const { saving, success, isLoaded, isDirty } = this.state;
    const { classes, theme } = this.props;

    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

    if (!isLoaded) {
      return (
        <LinearProgress />
      );
    }

    const { path } = this.props.match.params;
    const splitPath = path.split('/');
    const filename = splitPath[splitPath.length - 1];

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12} >
            <Paper className={classes.paper}>
              <Typography className={classes.filename} variant='h3'>{filename}</Typography>
              <div className={classes.wrapper}>
                <Fab disabled={!isDirty} className={buttonClassname} onClick={this.handleSave}>
                  {success ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                {saving && <CircularProgress size={68} className={classes.fabProgress} />}
              </div>
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
