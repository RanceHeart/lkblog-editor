// Loading case
import {initialState} from "../../sampleData.js";

// CRUD for posts
export const READ_POST_SUCCESS = 'READ_POST_SUCCESS';

export const READ_POST_START = 'READ_POST_START';

export const READ_POST_FAILURE = 'READ_POST_FAILURE';

export const readPost = (id) => {
  return (dispatch) => {
    dispatch({ type: 'READ_POST_START' });
    // Set
    new Promise((resolve) =>
      setTimeout(() => resolve(initialState.posts.find(post => post.id === id)), 400)  // Simulate a 1 second network delay
    )
      .then((post) => {
        dispatch({ type: 'READ_POST_SUCCESS', payload: post });
      });
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    dispatch({ type: 'DELETE_POST_START' });

    // Simulate a network request
    new Promise((resolve) =>
      setTimeout(() => resolve(id), 1000)  // Simulate a 1 second network delay
    )
      .then((id) => {
        dispatch({ type: 'DELETE_POST_SUCCESS', payload: id });
      })
      .catch((error) => {
        dispatch({ type: 'DELETE_POST_FAILURE', payload: error });
      });
  };
};
