import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { YouTubeToggle } from './YouTube';
import { connect } from 'react-redux';
import { transpose } from '../redux/actions';
import { updateColumnCount } from '../redux/actions';
import { updateFontSize } from '../redux/actions';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  padding: {
    padding: `0 ${theme.spacing.unit}px`,
  },
  words: {
    lineHeight: 1.8,
    whiteSpace: 'nowrap'
  },
  option: {
    display: 'flex',
    padding: 12
  },
  flexWithWidth: {
    display: 'flex',
    maxWidth: '65vw',
    overflowX: 'hidden'
  },
  scrollButton: {
    margin: 8
  }
});

function animate(prop, element, to) {
  const ease = (time) => (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
  const duration = 300;

  let start = null;
  const from = element[prop];
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
  };

  const step = (timestamp) => {
    if (cancelled) {
      return;
    }

    if (start === null) {
      start = timestamp;
    }
    const time = Math.min(1, (timestamp - start) / duration);

    element[prop] = ease(time) * (to - from) + from;

    if (time >= 1) {
      requestAnimationFrame(() => {});
      return;
    }

    requestAnimationFrame(step);
  };

  if (from === to) {
    return cancel;
  }

  requestAnimationFrame(step);
  return cancel;
}

class MusicToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.increase = '+1';
    this.decrease = '-1';
    this.toolbarRef = undefined;
  }

  handleTransposeClick = (event) => {
    // TODO: Update history with new transposeAmount
    this.props.transpose(event.target.textContent === this.increase);
  }

  handleColumnClick = (event) => {
    // TODO: Update history with new columnCount
    this.props.updateColumnCount(event.target.textContent === this.increase);
  }

  handleFontClick = (event) => {
    // TODO: Update history with new fontSize
    this.props.updateFontSize(event.target.textContent === this.increase);
  }

  handleLeftScroll = () => {
    this.handleMoveScroll(-this.toolbarRef.clientWidth);
  }

  handleRightScroll = () => {
    this.handleMoveScroll(this.toolbarRef.clientWidth);
  }

  handleMoveScroll = (delta) => {
    animate('scrollLeft', this.toolbarRef, this.toolbarRef.scrollLeft + delta);
  }

  handleToolbarRef = (ref) => {
    this.toolbarRef = ref;
  }

  render() {
    const { transposeAmount, columnCount, fontSize, classes } = this.props;

    return (
      <Toolbar>
        { this.toolbarRef && this.toolbarRef.scrollLeft > 0 ?
          <Button onClick={this.handleLeftScroll} className={classes.scrollButton}>
            <KeyboardArrowLeft />
          </Button> :
          undefined }
        <Grid container direction='row' justify='center' alignItems='center' spacing={16}>
          <div ref={this.handleToolbarRef} className={classes.flexWithWidth}>
            <Grid item>
              <YouTubeToggle youTubeId={this.props.youTubeId} />
            </Grid>
            {[{ name: 'Transpose', clickCallback: this.handleTransposeClick, value: transposeAmount },
              { name: 'Column Count', clickCallback: this.handleColumnClick, value: columnCount },
              { name: 'Font Size', clickCallback: this.handleFontClick, value: fontSize }]
              .map(({ name, clickCallback, value }) => (
                <div key={name} className={classes.option}>
                  <Grid item className={classes.words}>
                    <Badge color='primary' badgeContent={value}>
                      <Typography variant='body1' className={classes.padding}>{name}</Typography>
                    </Badge>
                  </Grid>
                  <Grid item>
                    <Button onClick={clickCallback}>
                      <Typography variant='body2'>{this.decrease}</Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={clickCallback}>
                      <Typography variant='body2'>{this.increase}</Typography>
                    </Button>
                  </Grid>
                </div>
              ))}
          </div>
        </Grid>
        <Button onClick={this.handleRightScroll} className={classes.scrollButton}>
          <KeyboardArrowRight />
        </Button>
      </Toolbar>
    );
  }
}

function mapStateToProps(state) {
  const { youtubeId, transposeAmount, columnCount, fontSize } = state;
  return { youtubeId, transposeAmount, columnCount, fontSize };
}

export default connect(
  mapStateToProps,
  { transpose, updateColumnCount, updateFontSize })(withStyles(styles)(MusicToolbar));
