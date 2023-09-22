import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './posts/postsReducer.js';
import userReducer from './user/userReducer.js';
import editorReducer from "./editor/editorReducer.js";
import musicFoldersReducer from "./musicFolders/musicFoldersReducer.js";

const rootReducer = combineReducers({
    editor: editorReducer,
    posts: postsReducer,
    user: userReducer,
    musicFolders: musicFoldersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
