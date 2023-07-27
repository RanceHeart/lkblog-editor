import { UPDATE_EDITOR_CONTENT } from './actions';

const initialState = {
  content: '',
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EDITOR_CONTENT:
      console.log(state.content);
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default editorReducer;
