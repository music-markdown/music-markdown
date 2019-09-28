import { Paper, Tooltip } from '@material-ui/core';
import Draggable from 'react-draggable';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  paper: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    padding: theme.spacing(2),
    cursor: 'move',
  },
});

const UnstyledYouTubePlayer = ({ classes, youTubeId, visible }) => (
  <Draggable>
    <Paper className={classes.paper} style={{ display: visible ? 'block': 'none' }}>
      <iframe
        title={youTubeId}
        style={{ border: 0 }}
        src={`https://www.youtube.com/embed/${youTubeId}`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
    </Paper>
  </Draggable>
);

const YouTubePlayer = withStyles(styles, { withTheme: true })(UnstyledYouTubePlayer);

class YouTubeToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: !props.youTubeId,
    };
  }

  handleToggle = (event) => {
    this.setState((state) => ({
      visible: !state.visible,
    }));
  };

  render() {
    if (!this.props.youTubeId) {
      return null;
    }

    return (
      <>
        <Tooltip title="Show / Hide YouTube Player">
          <IconButton color={this.state.visible ? 'secondary' : 'default'} onClick={this.handleToggle}>
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>

        <YouTubePlayer youTubeId={this.props.youTubeId} visible={this.state.visible} />
      </>
    );
  }
}

const ConnectedYouTubeToggle = connect((state) => ({ youTubeId: state.youTubeId }))(YouTubeToggle);

export {
  YouTubePlayer,
  ConnectedYouTubeToggle as YouTubeToggle
};
