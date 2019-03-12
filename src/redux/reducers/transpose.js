import { TRANSPOSE } from '../actionTypes';

const transposeAmount = (state = 0, action) => {
  switch (action.type) {
  case TRANSPOSE: {
    return action.payload.transposeAmount;
  }
  default: {
    return state;
  }
  }
};

export default transposeAmount;
