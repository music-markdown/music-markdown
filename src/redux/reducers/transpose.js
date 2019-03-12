import { TRANSPOSE } from '../actionTypes';

const transpose = (state = 0, action) => {
  switch (action.type) {
  case TRANSPOSE: {
    return action.payload.transposeAmount;
  }
  default: {
    return state;
  }
  }
};

export default transpose;
