import { IconButton, Tooltip } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import YouTubePlayer from "./YouTubePlayer";

export default function YouTubeToggle({ youTubeId }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!youTubeId);
  }, [youTubeId]);

  const handleToggle = () => {
    setVisible(!visible);
  };

  if (!youTubeId) {
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
      <YouTubePlayer visible={visible} youTubeId={youTubeId} />
    </>
  );
}

YouTubeToggle.propTypes = {
  youTubeId: PropTypes.string,
};
