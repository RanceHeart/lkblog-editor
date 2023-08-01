import {UPDATE_EDITOR_CONTENT} from './editorAction.js';

const initialState = {
  content: '',
  tags: [],
  isLoading: false
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EDITOR_CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default editorReducer;
