import { IconButton, Tooltip } from "@mui/material";

import { Box } from "@mui/system";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MoreMenu from "../MoreMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

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
