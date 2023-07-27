import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import editorReducer from './editorReducer.js';

const store = createStore(editorReducer, applyMiddleware(thunk));

export default store;
