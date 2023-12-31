// postsReducer.js
import {
    UPDATE_FILTER_KEYWORD,
    CREATE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_START,
    DELETE_POST_SUCCESS,
    FETCH_POSTS_FAILURE, FETCH_POSTS_START, FETCH_POSTS_SUCCESS,
    READ_POST_FAILURE,
    READ_POST_START,
    READ_POST_SUCCESS, UPDATE_POST_FAILURE, UPDATE_POST_START,
    UPDATE_POST_SUCCESS
} from './postsAction.js';

const initialState = {
    posts: [],  // Replace this with your initial posts data
    post: {
        id: '0',
        title: '',
        image: '',
        tags: [],
        content: '',
        readTime: 1
    }, // Target post
    filterKeyword: null, // Filter keywords
    isLoading: false
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FILTER_KEYWORD:
            return {
                ...state,
                filterKeyword: action.payload,
            };
        case FETCH_POSTS_START:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                isLoading: false,
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, action.payload],
                isLoading: false,
            };
        case READ_POST_START:
            return {
                ...state,
                isLoading: true,
            };
        case READ_POST_SUCCESS:
            return {
                ...state,
                post: action.payload,
                isLoading: false,
            };
        case READ_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case UPDATE_POST_START:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                post: action.payload.post,
                isLoading: false
            };
        case UPDATE_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
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
