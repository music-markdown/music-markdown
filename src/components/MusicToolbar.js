import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { YouTubeToggle } from './YouTube';
import { connect } from 'react-redux';
import { transpose } from '../redux/actions';
import { updateFontSize } from '../redux/actions';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = (theme) => ({
  padding: {
    padding: `0 ${theme.spacing.unit}px`,
  }
});

class MusicToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleTransposeClick = this.handleTransposeClick.bind(this);
    this.handleFontClick = this.handleFontClick.bind(this);

    this.increase = '+1';
    this.decrease = '-1';
  }

  handleTransposeClick(event) {
    // TODO: Update history with new transposeAmount
    this.props.transpose(event.target.textContent === this.increase);
  }

  handleFontClick(event) {
    // TODO: Update history with new fontSize
    this.props.updateFontSize(event.target.textContent === this.increase);
  }

  render() {
    const { transposeAmount, fontSize, classes } = this.props;

    return (
      <Toolbar>
        <Grid container direction='row' justify='center' alignItems='center' spacing={16}>
          {[{ name: 'Transpose', clickCallback: this.handleTransposeClick, value: transposeAmount },
            { name: 'Font Size', clickCallback: this.handleFontClick, value: fontSize }]
            .map(({ name, clickCallback, value }) => (
              <React.Fragment key={name}>
                <Grid item>
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
  const { youtubeId, transposeAmount, fontSize } = state;
  return { youtubeId, transposeAmount, fontSize };
}

export default connect(
  mapStateToProps,
  { transpose, updateFontSize })(withStyles(styles)(MusicToolbar));
