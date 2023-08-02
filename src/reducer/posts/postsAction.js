import {initialState} from "../sampleData.js";

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

        new Promise((resolve) =>
            setTimeout(() => resolve(initialState.posts), 1000)  // Simulate a 2 second network delay
        )
            .then((posts) => {
                dispatch({
                    type: FETCH_POSTS_SUCCESS,
                    payload: posts,
                });
            })
          .catch((error) => {
            dispatch({type: FETCH_POSTS_FAILURE, payload: error});
          });;
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
            setTimeout(() => resolve(updatedPost), 1000)  // Simulate a 1-second network delay
        )
            .then((updatedPost) => {
                // fake operation
                initialState.posts = initialState.posts.map((post) => {
                    return post.id === updatedPost.id ? updatedPost : post;
                });

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

export const deletePost = (id) => {
    return (dispatch) => {
        dispatch({type: DELETE_POST_START});

        // Simulate a network request
        new Promise((resolve) =>
            setTimeout(() => resolve(id), 1000)  // Simulate a 1 second network delay
        )
            .then((id) => {
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
        // Set
        new Promise((resolve) =>
            setTimeout(() => resolve(initialState.posts.find(post => post.id === id)), 400)  // Simulate a 1 second network delay
        )
            .then((post) => {
                console.log(post)
                dispatch({type: READ_POST_SUCCESS, payload: post});
            });
    };
};

export const updateFilterKeyword = (keyword) => ({
  type: UPDATE_FILTER_KEYWORD,
  payload: keyword,
});
