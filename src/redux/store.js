import { createStore } from 'redux';
import rootReducer from './reducers';

let store = undefined;
if (process.env.NODE_ENV === 'production') {
  store = createStore(rootReducer);
} else {
  store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default store;
