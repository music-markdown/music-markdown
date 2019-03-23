import { UPDATE_YOUTUBE_ID } from '../actionTypes';

const youTubeId = (state = '', action) => {
  switch (action.type) {
  case UPDATE_YOUTUBE_ID: {
    return action.payload.youtubeId || '';
  }
  default: {
    return state;
  }
  }
};

export default youTubeId;
