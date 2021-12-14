import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Tooltip } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Box } from "@mui/system";
import { useState } from "react";
import MoreMenu from "../MoreMenu";

export default function MoreAppBarItem() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleToggle = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <ClickAwayListener onClickAway={handleClose}>
        <Box>
          <Tooltip title="More">
            <IconButton onClick={handleToggle} size="large">
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <MoreMenu open={open} close={handleClose} anchorEl={anchorEl} />
        </Box>
      </ClickAwayListener>
    </Box>
  );
}
