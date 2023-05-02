import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";
import Draggable from "react-draggable";

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(2),
  cursor: "move",
}));

export default function YouTubePlayer({ youTubeId, visible }) {
  const nodeRef = useRef();

  if (!visible || !youTubeId) {
    return null;
  }

  return (
    <Draggable nodeRef={nodeRef}>
      <StyledPaper ref={nodeRef}>
        <iframe
          title="YouTube"
          style={{ border: 0 }}
          src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&modestbranding=1`}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </StyledPaper>
    </Draggable>
  );
}

YouTubePlayer.propTypes = {
  youTubeId: PropTypes.string,
  visible: PropTypes.bool,
};
