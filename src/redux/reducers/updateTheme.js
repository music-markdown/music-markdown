import { SET_DARK_THEME } from '../actionTypes';
import { MUSIC_MARKDOWN_LOCAL_STORAGE_NAMESPACE } from '../../lib/constants';

const defaultTheme = {
  typography: {
    useNextVariants: true,
  },
  reactRouterHoverInherit: {
    '&:hover': {
      color: 'inherit'
    },
  },
  palette: {
    type: window.localStorage.getItem(`${MUSIC_MARKDOWN_LOCAL_STORAGE_NAMESPACE}:palette-type`) || 'light',
  }
};

const theme = (state = defaultTheme, action) => {
  switch (action.type) {
  case SET_DARK_THEME: {
    const newTheme = JSON.parse(JSON.stringify(state));
    const paletteType = action.payload.isDarkTheme ? 'dark' : 'light';

    newTheme.palette.type = paletteType;
    window.localStorage.setItem(`${MUSIC_MARKDOWN_LOCAL_STORAGE_NAMESPACE}:palette-type`, paletteType);

    return newTheme;
  }
  default: {
    return state;
  }
  }
};

export default theme;
