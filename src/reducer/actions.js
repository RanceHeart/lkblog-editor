export const UPDATE_EDITOR_CONTENT = 'UPDATE_EDITOR_CONTENT';

export const updateEditorContent = (content) => ({
  type: UPDATE_EDITOR_CONTENT,
  payload: content,
});


export const SET_USER_DATA = 'SET_USER_DATA';

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});
