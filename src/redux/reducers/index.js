import { combineReducers } from 'redux';
import columnCount from './updateColumnCount';
import fontSize from './updateFontSize';
import transposeAmount from './transpose';
import youTubeId from './youTubeId';

export default combineReducers({ transposeAmount, columnCount, fontSize, youTubeId });
