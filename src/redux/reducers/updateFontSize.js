import { UPDATE_FONT_SIZE } from '../actionTypes';

const fontSize = (state = 13, action) => {
  switch (action.type) {
  case UPDATE_FONT_SIZE: {
    return action.payload.fontSize;
  }
  default: {
    return state;
  }
  }
};

export default fontSize;
