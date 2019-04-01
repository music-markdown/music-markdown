import columnCount from './updateColumnCount';
import { combineReducers } from 'redux';
import fontSize from './updateFontSize';
import theme from './updateTheme';
import transposeAmount from './transpose';
import youTubeId from './youTubeId';

export default combineReducers({
  transposeAmount,
  columnCount,
  fontSize,
  youTubeId,
  theme });
