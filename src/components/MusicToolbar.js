import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import { transpose } from '../redux/actions';
import { updateColumnCount } from '../redux/actions';
import { updateFontSize } from '../redux/actions';

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
    // TODO: Move dark theme to redux store.
    return (
      <Toolbar>
        <Grid container direction='row' justify='center' alignItems='center' spacing={16}>
          {[{ name: 'Transpose', clickCallback: this.handleTransposeClick },
            { name: 'Column Count', clickCallback: this.handleColumnClick },
            { name: 'Font Size', clickCallback: this.handleFontClick }].map(({ name, clickCallback }) => (
            <React.Fragment key={name}>
              <Grid item>
                <Typography variant='h6'>{name}</Typography>
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
        </Grid>
      </Toolbar>
    );
  }
}

export default connect(
  undefined,
  { transpose, updateColumnCount, updateFontSize }
)(MusicToolbar);
