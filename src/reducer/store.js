import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './posts/postsReducer.js';
import userReducer from './user/userReducer.js';
import editorReducer from "./editor/editorReducer.js";
import postReducer from "./posts/post/postReducer.js"; // Import the userReducer

const rootReducer = combineReducers({
    editor: editorReducer,
    post: postReducer,
    posts: postsReducer,
    user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
