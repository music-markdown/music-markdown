import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Popper from '@material-ui/core/Popper';
import React from 'react';
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
        <Button onClick={this.handleToggle} buttonRef={(node) => {
          this.anchorEl = node;
        }}>
          <PlayArrowIcon />
        </Button>
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
