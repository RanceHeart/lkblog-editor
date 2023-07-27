import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import editorReducer from './editorReducer.js';
import userReducer from './userReducer.js'; // Import the userReducer

const rootReducer = combineReducers({
    editor: editorReducer,
    user: userReducer, // Add the userReducer to the rootReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;