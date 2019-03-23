import React from 'react';
import { connect } from 'react-redux';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.anchorEl = undefined;

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState((state) => ({
      visible: !state.visible
    }));
  }

  render() {
    if (!this.props.youTubeId) {
      return <div></div>;
    }

    return (
      <>
        <IconButton onClick={this.handleToggle} buttonRef={(node) => {
          this.anchorEl = node;
        }}>
          <PlayArrowIcon />
        </IconButton>
        <Popper
          id='youtube-player'
          open={this.state.visible}
          anchorEl={this.anchorEl}
          placement='top'
          disablePortal={false}
          modifiers={{
            flip: {
              enabled: true,
            }
          }}
        >
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
