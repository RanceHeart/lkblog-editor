import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './postsReducer.js';
import userReducer from './userReducer.js';
import editorReducer from "./editorReducer.js";
import postReducer from "./postReducer.js"; // Import the userReducer

const rootReducer = combineReducers({
    editor: editorReducer,
    post: postReducer,
    posts: postsReducer,
    user: userReducer, // Add the userReducer to the rootReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
