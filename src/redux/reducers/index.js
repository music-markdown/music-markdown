import { combineReducers } from 'redux';
import theme from './updateTheme';
import youTubeId from './youTubeId';

export default combineReducers({
  youTubeId,
  theme
});
