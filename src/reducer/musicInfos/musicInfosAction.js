import api from "../../route/api.js";
import * as MUSIC_INFO_ROUTES from "../../route/musicInfo.js";

export const STORE_MUSIC_INFO_START = 'STORE_MUSIC_INFO_START';
export const STORE_MUSIC_INFO_SUCCESS = 'STORE_MUSIC_INFO_SUCCESS';
export const STORE_MUSIC_INFO_FAILURE = 'STORE_MUSIC_INFO_FAILURE';

export const FETCH_MUSIC_INFO_START = 'FETCH_MUSIC_INFO_START';
export const FETCH_MUSIC_INFO_SUCCESS = 'FETCH_MUSIC_INFO_SUCCESS';
export const FETCH_MUSIC_INFO_FAILURE = 'FETCH_MUSIC_INFO_FAILURE';

export const DELETE_MUSIC_INFO_START = 'DELETE_MUSIC_INFO_START';
export const DELETE_MUSIC_INFO_SUCCESS = 'DELETE_MUSIC_INFO_SUCCESS';
export const DELETE_MUSIC_INFO_FAILURE = 'DELETE_MUSIC_INFO_FAILURE';


export const deleteMusicInfo = (id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_MUSIC_INFO_START, payload: { id } });

        api.delete(MUSIC_INFO_ROUTES.DELETE_MUSIC_INFO(id))  // Assuming you have a DELETE_MUSIC_INFO route
            .then((response) => {
                dispatch({
                    type: DELETE_MUSIC_INFO_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: DELETE_MUSIC_INFO_FAILURE,
                    payload: { id, error: error.message || "An error occurred." }
                });
            });
    };
};

export const storeMusicInfo = (link, platformType, folderId) => {
    const data = { link, platformType, folderId }
    console.log("store music info: "+ data)
    return (dispatch) => {
        dispatch({type: STORE_MUSIC_INFO_START, payload: data});

        api.post(MUSIC_INFO_ROUTES.MUSIC_INFO(), data)
            .then((response) => {
                dispatch({
                    type: STORE_MUSIC_INFO_SUCCESS,
                    payload: response.data,
                });
                return response.data
            })
            .catch((error) => {
                dispatch({type: STORE_MUSIC_INFO_FAILURE, payload: error});
            });
    };
};

export const fetchMusicInfoById = (id) => {
    return (dispatch) => {
        dispatch({ type: FETCH_MUSIC_INFO_START, payload: { id } });

        api.get(MUSIC_INFO_ROUTES.READ_MUSIC_INFO(id))
            .then((response) => {
                dispatch({
                    type: FETCH_MUSIC_INFO_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_MUSIC_INFO_FAILURE,
                    payload: { id, error: error.message || "An error occurred." }
                });
            });
    };
};
