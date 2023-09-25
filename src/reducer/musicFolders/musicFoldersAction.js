import * as MUSIC_FOLDER_ROUTES from "../../route/musicFolder.js";
import api from "../../route/api.js";

export const EDIT_MUSIC_FOLDER_TOGGLE = 'EDIT_MUSIC_FOLDER_TOGGLE';

export const FETCH_ALL_MUSIC_FOLDERS_START = 'FETCH_ALL_MUSIC_FOLDERS_START';
export const FETCH_ALL_MUSIC_FOLDERS_SUCCESS = 'FETCH_ALL_MUSIC_FOLDERS_SUCCESS';
export const FETCH_ALL_MUSIC_FOLDERS_FAILURE = 'FETCH_ALL_MUSIC_FOLDERS_FAILURE';

export const FETCH_MUSIC_FOLDER_START = 'FETCH_MUSIC_FOLDER_START';
export const FETCH_MUSIC_FOLDER_SUCCESS = 'FETCH_MUSIC_FOLDER_SUCCESS';
export const FETCH_MUSIC_FOLDER_FAILURE = 'FETCH_MUSIC_FOLDER_FAILURE';
export const UPDATE_MUSIC_FOLDER_START = 'UPDATE_MUSIC_FOLDER_START';
export const UPDATE_MUSIC_FOLDER_SUCCESS = 'UPDATE_MUSIC_FOLDER_SUCCESS';
export const UPDATE_MUSIC_FOLDER_FAILURE = 'UPDATE_MUSIC_FOLDER_FAILURE';

export const DELETE_MUSIC_FOLDER_START = 'DELETE_MUSIC_FOLDER_START';
export const DELETE_MUSIC_FOLDER_SUCCESS = 'DELETE_MUSIC_FOLDER_SUCCESS';
export const DELETE_MUSIC_FOLDER_FAILURE = 'DELETE_MUSIC_FOLDER_FAILURE';

export const CREATE_MUSIC_FOLDER_START = 'CREATE_MUSIC_FOLDER_START';
export const CREATE_MUSIC_FOLDER_SUCCESS = 'CREATE_MUSIC_FOLDER_SUCCESS';
export const CREATE_MUSIC_FOLDER_FAILURE = 'CREATE_MUSIC_FOLDER_FAILURE';

export const ADD_NEW_MUSIC_INFO_TO_FOLDER = 'ADD_NEW_MUSIC_INFO_TO_FOLDER';

export const toggleMusicEditButton = (editToggleBoolean) => ({
    type: EDIT_MUSIC_FOLDER_TOGGLE,
    payload: editToggleBoolean,
});

export const addMusicInfoToFolder = (newFolderData) => {
    return (dispatch) => {
        dispatch({
            type: ADD_NEW_MUSIC_INFO_TO_FOLDER,
            payload: newFolderData,
        });
    }
}
export const createMusicFolder = (folderData) => {
    return (dispatch) => {
        dispatch({type: CREATE_MUSIC_FOLDER_START});

        api.post(MUSIC_FOLDER_ROUTES.MUSIC_FOLDERS, folderData)
            .then((response) => {
                dispatch({
                    type: CREATE_MUSIC_FOLDER_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({type: CREATE_MUSIC_FOLDER_FAILURE, payload: error});
            });
    };
};

export const saveMusicFolder = (folder) => {
    return (dispatch) => {
        dispatch({type: UPDATE_MUSIC_FOLDER_START});

        api.put(MUSIC_FOLDER_ROUTES.UPDATE_MUSIC_FOLDER(folder["_id"]), folder)
            .then((response) => {
                dispatch({
                    type: UPDATE_MUSIC_FOLDER_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({type: UPDATE_MUSIC_FOLDER_FAILURE, payload: error});
            });
    };
};

export const deleteMusicFolder = (id) => {
    return (dispatch) => {
        dispatch({type: DELETE_MUSIC_FOLDER_START});

        api.delete(MUSIC_FOLDER_ROUTES.DELETE_MUSIC_FOLDER(id))
            .then((response) => {
                dispatch({type: DELETE_MUSIC_FOLDER_SUCCESS, payload: id});
            })
            .catch((error) => {
                dispatch({type: DELETE_MUSIC_FOLDER_FAILURE, payload: error});
            });
    };
};

export const fetchAllMusicFolderIds = () => {
    return (dispatch) => {
        dispatch({type: FETCH_ALL_MUSIC_FOLDERS_START});

        api.get(MUSIC_FOLDER_ROUTES.MUSIC_FOLDERS)
            .then((response) => {
                dispatch({
                    type: FETCH_ALL_MUSIC_FOLDERS_SUCCESS,
                    payload: response.data, // This will be an array of IDs
                });
            })
            .catch((error) => {
                dispatch({type: FETCH_ALL_MUSIC_FOLDERS_FAILURE, payload: error});
            });
    };
};

export const fetchMusicFolderById = (id) => {
    return (dispatch) => {
        dispatch({type: FETCH_MUSIC_FOLDER_START});

        api.get(MUSIC_FOLDER_ROUTES.READ_MUSIC_FOLDER(id))
            .then((response) => {
                dispatch({
                    type: FETCH_MUSIC_FOLDER_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({type: FETCH_MUSIC_FOLDER_FAILURE, payload: error});
            });
    };
};