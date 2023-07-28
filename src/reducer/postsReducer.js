// reducer.js
import {CREATE_POST, READ_POST, UPDATE_POST, DELETE_POST, FETCH_POSTS} from './actions';

const initialState = {
  posts: [],  // Replace this with your initial posts data
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      console.log(action)
      return {
        ...state,
        posts: action.payload,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case READ_POST:
      return {
        ...state,
        post: state.posts.find(post => post.id === action.payload),
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload.updatedPost : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    default:
      return state;
  }
};

export default postsReducer;
