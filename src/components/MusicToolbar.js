import { COLUMN_COUNT_QUERY_KEY, TRANSPOSE_QUERY_KEY } from "../lib/constants";
import { useState } from "react";

import Badge from "@mui/material/Badge";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Slider from "@mui/material/Slider";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from "@mui/material/Tooltip";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import makeStyles from '@mui/styles/makeStyles';
import queryString from "query-string";
import YouTubeToggle from "./YouTubeToggle";
import { useYouTubeId } from "./GlobalState";

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 9999,
  },
  paper: {
    padding: theme.spacing(2),
  },
  slider: {
    width: 300,
  },
}));

const handleUpdateQuery = (props, name, value, original) => {
  const params = queryString.parse(props.location.search);
  if (value === original) {
    delete params[name];
  } else {
    params[name] = value;
  }
  props.history.push({ search: queryString.stringify(params) });
};

const ColumnCountSelector = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState();

  const handleToggle = (event) => {
    setAnchorEl(!anchorEl ? event.currentTarget : undefined);
  };

  const handleClickAway = (event) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setAnchorEl(undefined);
  };

  const params = queryString.parse(props.location.search);
  const columnCount = params[COLUMN_COUNT_QUERY_KEY] || "1";

  return <>
    <Tooltip title="Set Number of Columns">
      <IconButton onClick={handleToggle} size="large">
        <Badge
          badgeContent={columnCount}
          invisible={columnCount === "1"}
          color="secondary"
        >
          <ViewColumnIcon />
        </Badge>
      </IconButton>
    </Tooltip>

    <Popper className={classes.popper} open={!!anchorEl} anchorEl={anchorEl}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Paper className={classes.paper}>
          <ToggleButtonGroup
            value={columnCount}
            exclusive
            onChange={(event, value) =>
              handleUpdateQuery(props, COLUMN_COUNT_QUERY_KEY, value, "1")
            }
          >
            {["1", "2", "3", "4", "5", "6", "7", "8"].map((columnCount) => (
              <ToggleButton value={columnCount} key={columnCount}>
                {columnCount}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Paper>
      </ClickAwayListener>
    </Popper>
  </>;
};

const TransposeSelector = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState();

  const handleToggle = (event) => {
    setAnchorEl(!anchorEl ? event.currentTarget : undefined);
  };

  const handleClickAway = (event) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setAnchorEl(undefined);
  };

  const params = queryString.parse(props.location.search);
  const transpose = params[TRANSPOSE_QUERY_KEY] || "0";

  return <>
    <Tooltip title="Transpose Up / Down">
      <IconButton onClick={handleToggle} size="large">
        <Badge
          badgeContent={transpose}
          invisible={transpose === "0"}
          color="secondary"
        >
          <LowPriorityIcon />
        </Badge>
      </IconButton>
    </Tooltip>

    <Popper className={classes.popper} open={!!anchorEl} anchorEl={anchorEl}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Paper className={classes.paper}>
          <Slider
            className={classes.slider}
            value={Number(transpose)}
            min={-12}
            max={12}
            step={1}
            marks={true}
            onChange={(event, value) =>
              handleUpdateQuery(
                props,
                TRANSPOSE_QUERY_KEY,
                String(value),
                "0"
              )
            }
          />
        </Paper>
      </ClickAwayListener>
    </Popper>
  </>;
};

export default function MusicToolbar(props) {
  const { youTubeId } = useYouTubeId();

  return (
    <>
      <YouTubeToggle youTubeId={youTubeId} />
      <TransposeSelector {...props} />
      <ColumnCountSelector {...props} />
    </>
  );
}
