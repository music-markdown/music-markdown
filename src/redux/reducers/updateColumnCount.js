import { UPDATE_COLUMN_COUNT } from '../actionTypes';

const columnCount = (state = 1, action) => {
  switch (action.type) {
  case UPDATE_COLUMN_COUNT: {
    return action.payload.columnCount;
  }
  default: {
    return state;
  }
  }
};

export default columnCount;
