import { UPDATE_EDITOR_CONTENT } from './actions';

const initialState = {
  title: '',
  image: '',
  tags: [],
  content: '',
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EDITOR_CONTENT:
      console.log(action.payload)
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default editorReducer;