import React from 'react';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

import { transpose } from '../redux/actions';
import { updateColumnCount } from '../redux/actions';
import { updateFontSize } from '../redux/actions';
import { YouTubeToggle } from './YouTube';

const styles = (theme) => ({
  padding: {
    padding: `0 ${theme.spacing.unit}px`,
  }
});

class MusicToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleTransposeClick = this.handleTransposeClick.bind(this);
    this.handleColumnClick = this.handleColumnClick.bind(this);
    this.handleFontClick = this.handleFontClick.bind(this);

    this.increase = '+1';
    this.decrease = '-1';
  }

  handleTransposeClick(event) {
    // TODO: Update history with new transposeAmount
    this.props.transpose(event.target.textContent === this.increase);
  }

  handleColumnClick(event) {
    // TODO: Update history with new columnCount
    this.props.updateColumnCount(event.target.textContent === this.increase);
  }

  handleFontClick(event) {
    // TODO: Update history with new fontSize
    this.props.updateFontSize(event.target.textContent === this.increase);
  }

  render() {
    const { transposeAmount, columnCount, fontSize, classes } = this.props;

    return (
      <Toolbar>
        <Grid container direction='row' justify='center' alignItems='center' spacing={16}>
          {[{ name: 'Transpose', clickCallback: this.handleTransposeClick, value: transposeAmount },
            { name: 'Column Count', clickCallback: this.handleColumnClick, value: columnCount },
            { name: 'Font Size', clickCallback: this.handleFontClick, value: fontSize }]
            .map(({ name, clickCallback, value }) => (
              <React.Fragment key={name}>
                <Grid item>
                  <Badge color='primary' badgeContent={value}>
                    <Typography variant='h6' className={classes.padding}>{name}</Typography>
                  </Badge>
                </Grid>
                <Grid item>
                  <Button onClick={clickCallback}>
                    <Typography>{this.decrease}</Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={clickCallback}>
                    <Typography>{this.increase}</Typography>
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
          <Grid item>
            <YouTubeToggle youTubeId={this.props.youTubeId} />
          </Grid>
        </Grid>
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
