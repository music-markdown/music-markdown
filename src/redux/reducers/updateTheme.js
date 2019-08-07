import { LOCAL_STORAGE_NAMESPACE } from '../../lib/constants';
import { SET_DARK_THEME } from '../actionTypes';

const lightTheme = {
  typography: {
    useNextVariants: true,
  },
  reactRouterHoverInherit: {
    '&:hover': {
      color: 'inherit'
    },
  },
  palette: {
    type: 'light',
  },
};

const darkTheme = {
  typography: {
    useNextVariants: true,
  },
  reactRouterHoverInherit: {
    '&:hover': {
      color: 'inherit'
    },
  },
  palette: {
    type: 'dark',
  },
};

const initialTheme = (window.localStorage.getItem(`${LOCAL_STORAGE_NAMESPACE}:palette-type`) === 'dark'
  ? darkTheme : lightTheme);


const theme = (state = initialTheme, action) => {
  switch (action.type) {
  case SET_DARK_THEME: {
    window.localStorage.setItem(`${LOCAL_STORAGE_NAMESPACE}:palette-type`, action.payload.isDarkTheme
      ? 'dark' : 'light');
    return action.payload.isDarkTheme ? darkTheme : lightTheme;
  }
  default: {
    return state;
  }
  }
};

export default theme;
