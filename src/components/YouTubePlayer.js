import { Paper } from "@material-ui/core";
import { useRef } from "react";

import Draggable from "react-draggable";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    padding: theme.spacing(2),
    cursor: "move",
  },
}));

export default function YouTubePlayer({ youTubeId, visible }) {
  const classes = useStyles();
  const nodeRef = useRef();

  if (!visible || !youTubeId) {
    return null;
  }

  return (
    <Draggable nodeRef={nodeRef}>
      <Paper ref={nodeRef} className={classes.paper}>
        <iframe
          title="YouTube"
          style={{ border: 0 }}
          src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&modestbranding=1`}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Paper>
    </Draggable>
  );
}

YouTubePlayer.propTypes = {
  youTubeId: PropTypes.string,
  visible: PropTypes.bool,
};
