import {initialState} from "../sampleData.js";
import * as ROUTES from "../../route/posts.js";
import api from "../../route/api.js";

export const UPDATE_FILTER_KEYWORD = 'UPDATE_FILTER_KEYWORD';
export const DELETE_POST_START = 'DELETE_POST_START';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const UPDATE_POST_START = 'UPDATE_POST_START';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const CREATE_POST_START = 'CREATE_POST_START';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const READ_POST_START = 'READ_POST_START';
export const READ_POST_SUCCESS = 'READ_POST_SUCCESS';
export const READ_POST_FAILURE = 'READ_POST_FAILURE';


export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const fetchPosts = () => {
    return (dispatch) => {
        dispatch({type: FETCH_POSTS_START});

        api.get(ROUTES.POSTS)
            .then((response) => {
                dispatch({
                    type: FETCH_POSTS_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({type: FETCH_POSTS_FAILURE, payload: error});
            });
    };
};

export const createPost = (post) => {
    return (dispatch) => {
        dispatch({type: CREATE_POST_START});

        api.post(ROUTES.ADD_POST, post)
            .then((response) => {
                dispatch({
                    type: CREATE_POST_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({type: CREATE_POST_FAILURE, payload: error});
            });
    };
};

export const updatePost = (updatedPost) => {
    return (dispatch) => {
        dispatch({type: UPDATE_POST_START});

        api.post(ROUTES.UPDATE_POST(updatedPost.id), updatedPost)
            .then((response) => {
                dispatch({
                    type: UPDATE_POST_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({type: UPDATE_POST_FAILURE, payload: error});
            });
    };
};

export const deletePost = (id) => {
    return (dispatch) => {
        dispatch({type: DELETE_POST_START});

        api.delete(ROUTES.DELETE_POST(id))
            .then((response) => {
                dispatch({type: DELETE_POST_SUCCESS, payload: id});
            })
            .catch((error) => {
                dispatch({type: DELETE_POST_FAILURE, payload: error});
            });
    };
};

export const readPost = (id) => {
    return (dispatch) => {
        dispatch({type: READ_POST_START});

        api.get(ROUTES.READ_POST(id))
            .then((response) => {
                dispatch({type: READ_POST_SUCCESS, payload: response.data});
            })
            .catch((error) => {
                dispatch({type: READ_POST_FAILURE, payload: error});
            });
    };
};

// Using tag instead
export const updateFilterKeyword = (keyword) => ({
  type: UPDATE_FILTER_KEYWORD,
  payload: keyword,
});
