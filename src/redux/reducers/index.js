import { combineReducers } from 'redux';
import transpose from './transpose';
import columnCount from './updateColumnCount';

export default combineReducers({ transpose, columnCount });
