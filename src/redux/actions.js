import {
  SET_DARK_THEME,
  UPDATE_YOUTUBE_ID
} from './actionTypes';

export const updateYouTubeId = (youtubeId) => ({
  type: UPDATE_YOUTUBE_ID,
  payload: {
    youtubeId
  }
});

export const setDarkTheme = (isDarkTheme) => {
  return {
    type: SET_DARK_THEME,
    payload: {
      isDarkTheme
    }
  };
};
