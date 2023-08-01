// postsReducer.js
import {
    CREATE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_START,
    DELETE_POST_SUCCESS,
    FETCH_POSTS,
    UPDATE_POST_SUCCESS
} from './postsAction.js';

const initialState = {
    posts: [],  // Replace this with your initial posts data
    isLoading: false
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                posts: action.payload,
            };
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post =>
                  post.id === action.payload.id ? action.payload : post
                ),
            };
        case DELETE_POST_START:
            return {
                ...state,
                isLoading: true,
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                posts: state.posts.filter(post => post.id !== action.payload),
            };
        case DELETE_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default postsReducer;
