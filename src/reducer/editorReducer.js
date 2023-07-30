import {SET_LOADING, UPDATE_EDITOR_CONTENT} from './actions';

const initialState = {
  content: '',
  tags: [],
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EDITOR_CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};

export default editorReducer;
