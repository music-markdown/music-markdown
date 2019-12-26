import { Paper, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Draggable from "react-draggable";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { makeStyles } from "@material-ui/core/styles";
import { useGlobalStateContext } from "./GlobalState";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    padding: theme.spacing(2),
    cursor: "move"
  }
}));

export function YouTubePlayer({ youTubeId }) {
  const classes = useStyles();
  return (
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
}

export function YouTubeToggle() {
  const context = useGlobalStateContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!context.data.youTubeId);
  }, [context.data.youTubeId]);

  const handleToggle = () => {
    setVisible(!visible);
  };

  if (!context.data.youTubeId) {
    return null;
  }

  return (
    <>
      <Tooltip title="Show / Hide YouTube Player">
        <IconButton
          color={visible ? "secondary" : "default"}
          onClick={handleToggle}
        >
          <PlayArrowIcon />
        </IconButton>
      </Tooltip>
      {visible ? <YouTubePlayer youTubeId={context.data.youTubeId} /> : ""}
    </>
  );
}
