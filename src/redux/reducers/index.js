import { combineReducers } from 'redux';
import transposeAmount from './transpose';
import columnCount from './updateColumnCount';

export default combineReducers({ transposeAmount, columnCount });
