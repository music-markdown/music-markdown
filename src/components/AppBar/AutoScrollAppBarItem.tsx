import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useAutoScroll } from "../../context/AutoScrollProvider";

export default function AutoScrollAppBarItem() {
  const { autoScroll } = useAutoScroll();
  const [disabled, setDisabled] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleToggle = () => {
    if (autoScroll) {
      const [waitTime, scrollPixelsPerSecond] = autoScroll
        .split(",")
        .map(Number);
      const intervalTime = 1000 / scrollPixelsPerSecond;

      if (!scrolling) {
        const startScrolling = () => {
          setScrollInterval(
            setInterval(() => {
              window.scrollBy(0, 1);
              if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight
              ) {
                clearInterval(scrollInterval as NodeJS.Timeout);
                setScrolling(false);
              }
            }, intervalTime)
          );
        };

        if (window.scrollY === 0) {
          setTimeout(startScrolling, waitTime * 1000);
        } else {
          startScrolling();
        }

        setScrolling(true);
      } else {
        clearInterval(scrollInterval as NodeJS.Timeout);
        setScrolling(false);
      }
    }

    setDisabled(!disabled);
  };

  // Clear interval when component unmounts
  useEffect(() => {
    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [scrollInterval]);

  return (
    <Tooltip title="Start / Stop Auto Scroll">
      <IconButton
        color={disabled ? "secondary" : "default"}
        onClick={handleToggle}
        size="large"
        disabled={!autoScroll}
      >
        <ArrowDownwardIcon />
      </IconButton>
    </Tooltip>
  );
}
