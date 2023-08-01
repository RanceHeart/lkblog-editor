// Delete Action
import {initialState} from "../sampleData.js";

export const DELETE_POST_START = 'DELETE_POST_START';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

// Update Action
export const UPDATE_POST_START = 'UPDATE_POST_START';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const CREATE_POST_START = 'CREATE_POST_START';

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';

export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

// Update Action

export const FETCH_POSTS = 'FETCH_POSTS';

export const fetchPosts = () => {
  return (dispatch) => {
    new Promise((resolve) =>
      setTimeout(() => resolve(initialState.posts), 1000)  // Simulate a 2 second network delay
    )
      .then((posts) => {
        dispatch({
          type: FETCH_POSTS,
          payload: posts,
        });
      });
  };
};

export const createPost = (post) => {
  return (dispatch) => {
    dispatch({type: CREATE_POST_START});

    // Simulate a network request
    new Promise((resolve) =>
      setTimeout(() => resolve({...post, id: initialState.posts.length + 1}), 1000)  // Simulate a 1-second network delay
    )
      .then((post) => {
        // fake operation
        initialState.posts.push(post);

        dispatch({
          type: CREATE_POST_SUCCESS,
          payload: post,
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

    // Simulate a network request
    new Promise((resolve) =>
      setTimeout(() => resolve(updatedPost), 1000)  // Simulate a 1 second network delay
    )
      .then((updatedPost) => {
        // fake operation
        initialState.posts.set(updatedPost.id, updatedPost);

        dispatch({
          type: UPDATE_POST_SUCCESS,
          payload: updatedPost,
        });
      })
      .catch((error) => {
        dispatch({type: UPDATE_POST_FAILURE, payload: error});
      });
  };
};
