import { COLUMN_COUNT_QUERY_KEY, TRANSPOSE_QUERY_KEY } from '../lib/constants';
import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import LowPriorityIcon from '@material-ui/icons/LowPriority';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import Slider from '@material-ui/core/Slider';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { YouTubeToggle } from './YouTube';
import { connect } from 'react-redux';
import queryString from 'query-string';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  popper: {
    zIndex: 9999
  },
  paper: {
    padding: theme.spacing(2),
  },
  slider: {
    width: 300
  },
});

const handleUpdateQuery = (props, name, value, original) => {
  const params = queryString.parse(props.location.search);
  if (value === original) {
    delete params[name];
  } else {
    params[name] = value;
  }
  props.history.push({ search: queryString.stringify(params) });
};

class UnstyledColumnCountSelector extends React.Component {
  state = {
    anchorEl: undefined,
  };

  handleToggle = (event) => {
    this.setState({
      anchorEl: !this.state.anchorEl ? event.currentTarget : undefined,
    });
  };

  handleClickAway = (event) => {
    if (this.state.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ anchorEl: undefined });
  };

  render() {
    const params = queryString.parse(this.props.location.search);
    const columnCount = params[COLUMN_COUNT_QUERY_KEY] || '1';
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        <Tooltip title="Set Number of Columns">
          <IconButton onClick={this.handleToggle}>
            <Badge badgeContent={columnCount} invisible={columnCount === '1'} color="secondary">
              <ViewColumn />
            </Badge>
          </IconButton>
        </Tooltip>

        <Popper className={classes.popper} open={!!anchorEl} anchorEl={anchorEl}>
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <ToggleButtonGroup value={columnCount} exclusive
              onChange={(event, value) => handleUpdateQuery(this.props, COLUMN_COUNT_QUERY_KEY, value, '1')}>
              {['1', '2', '3', '4', '5', '6', '7', '8'].map((columnCount) => (
                <ToggleButton value={columnCount} key={columnCount}>
                  {columnCount}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </ClickAwayListener>
        </Popper>
      </>
    );
  }
};

const ColumnCountSelector = withStyles(styles, { withTheme: true })(UnstyledColumnCountSelector);

class UnstyledTransposeSelector extends React.Component {
  state = {
    anchorEl: undefined,
  }

  handleToggle = (event) => {
    this.setState({
      anchorEl: !this.state.anchorEl ? event.currentTarget : undefined,
    });
  };

  handleClickAway = (event) => {
    if (this.state.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ anchorEl: undefined });
  };

  render() {
    const params = queryString.parse(this.props.location.search);
    const transpose = params[TRANSPOSE_QUERY_KEY] || '0';
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        <Tooltip title="Transpose Up / Down">
          <IconButton onClick={this.handleToggle}>
            <Badge badgeContent={transpose} invisible={transpose === '0'} color="secondary">
              <LowPriorityIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Popper className={classes.popper} open={!!anchorEl} anchorEl={anchorEl}>
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <Paper className={classes.paper}>
              <Slider
                className={classes.slider}
                value={Number(transpose)}
                min={-12}
                max={12}
                step={1}
                marks={true}
                onChange={(event, value) => handleUpdateQuery(this.props, TRANSPOSE_QUERY_KEY, String(value), '0')} />
            </Paper>
          </ClickAwayListener>
        </Popper>
      </>
    );
  }
}

const TransposeSelector = withStyles(styles, { withTheme: true })(UnstyledTransposeSelector);

const MusicToolbar = (props) => (
  <>
    <YouTubeToggle youTubeId={props.youTubeId} />
    <TransposeSelector {...props} />
    <ColumnCountSelector {...props} />
  </>
);


function mapStateToProps(state) {
  const { youtubeId } = state;
  return { youtubeId };
}

export default connect(mapStateToProps)(withStyles(styles)(MusicToolbar));
