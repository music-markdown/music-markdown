import { COLUMN_COUNT_QUERY_KEY, TRANSPOSE_QUERY_KEY } from "../lib/constants";
import React, { useState } from "react";

import Badge from "@material-ui/core/Badge";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Slider from "@material-ui/core/Slider";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import { YouTubeToggle } from "./YouTube";
import { makeStyles } from "@material-ui/core/styles";
import queryString from "query-string";

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

  return (
    <>
      <Tooltip title="Set Number of Columns">
        <IconButton onClick={handleToggle}>
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
    </>
  );
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

  return (
    <>
      <Tooltip title="Transpose Up / Down">
        <IconButton onClick={handleToggle}>
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
    </>
  );
};

export default function MusicToolbar(props) {
  return (
    <>
      <YouTubeToggle youTubeId={props.youTubeId} />
      <TransposeSelector {...props} />
      <ColumnCountSelector {...props} />
    </>
  );
}
