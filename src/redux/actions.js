import {
  TRANSPOSE,
  UPDATE_COLUMN_COUNT,
  UPDATE_FONT_SIZE,
  UPDATE_YOUTUBE_ID
} from './actionTypes';

let transposeAmount = 0;
let columnCount = 1;
let fontSize = 13;

export const updateYouTubeId = (youtubeId) => ({
  type: UPDATE_YOUTUBE_ID,
  payload: {
    youtubeId
  }
});

export const transpose = (isIncreaseTransposeAmount) => ({
  type: TRANSPOSE,
  payload: {
    transposeAmount: isIncreaseTransposeAmount ? ++transposeAmount : --transposeAmount
  }
});

export const updateColumnCount = (isIncreaseColumnCount) => ({
  type: UPDATE_COLUMN_COUNT,
  payload: {
    columnCount: isIncreaseColumnCount ? ++columnCount : --columnCount
  }
});

export const updateFontSize = (isIncreaseFontSize) => ({
  type: UPDATE_FONT_SIZE,
  payload: {
    fontSize: isIncreaseFontSize ? ++fontSize : --fontSize
  }
});

export const setTranspose = (newTransposeAmount) => {
  transposeAmount = newTransposeAmount;

  return {
    type: TRANSPOSE,
    payload: {
      transposeAmount
    }
  };
};

export const setColumnCount = (newColumnCount) => {
  columnCount = newColumnCount;

  return {
    type: UPDATE_COLUMN_COUNT,
    payload: {
      columnCount
    }
  };
};

export const setFontSize = (newFontSize) => {
  fontSize = newFontSize;

  return {
    type: UPDATE_FONT_SIZE,
    payload: {
      fontSize
    }
  };
};
