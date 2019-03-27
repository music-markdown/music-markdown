import { combineReducers } from 'redux';
import columnCount from './updateColumnCount';
import fontSize from './updateFontSize';
import transposeAmount from './transpose';
import youTubeId from './youTubeId';
import theme from './updateTheme';

export default combineReducers({
  transposeAmount,
  columnCount,
  fontSize,
  youTubeId,
  theme });
