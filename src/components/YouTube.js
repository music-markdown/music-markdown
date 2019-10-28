import { Paper, Tooltip } from "@material-ui/core";
import Draggable from "react-draggable";
import { GlobalStateContext } from "./GlobalState";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  paper: {
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    padding: theme.spacing(2),
    cursor: "move"
  }
});

const UnstyledYouTubePlayer = ({ classes, youTubeId }) => (
  <Draggable>
    <Paper className={classes.paper}>
      <iframe
        title={youTubeId}
        style={{ border: 0 }}
        src={`https://www.youtube.com/embed/${youTubeId}`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Paper>
  </Draggable>
);

const YouTubePlayer = withStyles(styles, { withTheme: true })(
  UnstyledYouTubePlayer
);

class YouTubeToggle extends React.Component {
  static contextType = GlobalStateContext;

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount = () => {
    this.setState({ visible: !this.context.data.youTubeId });
  };

  handleToggle = () => {
    this.setState(state => ({
      visible: !state.visible
    }));
  };

  render() {
    if (!this.context.data.youTubeId) {
      return null;
    }

    return (
      <>
        <Tooltip title="Show / Hide YouTube Player">
          <IconButton
            color={this.state.visible ? "secondary" : "default"}
            onClick={this.handleToggle}
          >
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>
        {this.state.visible ? (
          <YouTubePlayer youTubeId={this.context.data.youTubeId} />
        ) : (
          ""
        )}
      </>
    );
  }
}

export { YouTubePlayer, YouTubeToggle };
