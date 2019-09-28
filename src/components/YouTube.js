import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import { Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';

const YouTubePlayer = ({ youTubeId }) => (
  <div className="embed-responsive embed-responsive-16by9">
    <iframe
      title={youTubeId}
      className='embed-responsive-item'
      src={`https://www.youtube.com/embed/${youTubeId}`}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen>
    </iframe>
  </div>
);

class YouTubeToggle extends React.Component {
  state = {
    anchorEl: undefined,
  }

  handleToggle = (event) => {
    this.setState({
      anchorEl: !this.state.anchorEl ? event.currentTarget : undefined,
    });
  };

  render() {
    if (!this.props.youTubeId) {
      return null;
    }

    return (
      <>
        <Tooltip title="Play YouTube Video">
          <IconButton onClick={this.handleToggle} buttonRef={(node) => {
            this.anchorEl = node;
          }}>
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>

        <Popper
          id='youtube-player'
          open={!!this.state.anchorEl}
          anchorEl={this.state.anchorEl}
          placement='top'>
          <YouTubePlayer youTubeId={this.props.youTubeId} />
        </Popper>
      </>
    );
  }
}

const ConnectedYouTubeToggle = connect((state) => ({ youTubeId: state.youTubeId }))(YouTubeToggle);

export {
  YouTubePlayer,
  ConnectedYouTubeToggle as YouTubeToggle
};
