import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useYouTubeId } from "../../context/YouTubeIdProvider";
import YouTubePlayer from "./YouTubePlayer";

export default function YouTubeAppBarItem() {
  const { youTubeId } = useYouTubeId();
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
          size="large"
        >
          <PlayArrowIcon />
        </IconButton>
      </Tooltip>
      <YouTubePlayer visible={visible} youTubeId={youTubeId} />
    </>
  );
}
