import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
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
      <div>
        <FontAwesomeIcon icon={faYoutube} size='2x' onClick={this.handleToggle} />
        {this.state.visible ? <YouTubePlayer youTubeId={this.props.youTubeId} /> : ''}
      </div>
    );
  }
}

const ConnectedYouTubeToggle = connect((state) => ({ youTubeId: state.youTubeId }))(YouTubeToggle);

export {
  YouTubePlayer,
  ConnectedYouTubeToggle as YouTubeToggle
};
