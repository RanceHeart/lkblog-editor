import {
    EDIT_MUSIC_FOLDER_TOGGLE,
    UPDATE_MUSIC_FOLDER_START,
    UPDATE_MUSIC_FOLDER_SUCCESS,
    UPDATE_MUSIC_FOLDER_FAILURE,
    DELETE_MUSIC_FOLDER_START,
    DELETE_MUSIC_FOLDER_SUCCESS,
    DELETE_MUSIC_FOLDER_FAILURE,
    FETCH_ALL_MUSIC_FOLDERS_START,
    FETCH_MUSIC_FOLDER_START,
    FETCH_ALL_MUSIC_FOLDERS_FAILURE,
    FETCH_MUSIC_FOLDER_FAILURE,
    FETCH_MUSIC_FOLDER_SUCCESS,
    FETCH_ALL_MUSIC_FOLDERS_SUCCESS,
    CREATE_MUSIC_FOLDER_START,
    CREATE_MUSIC_FOLDER_SUCCESS,
    CREATE_MUSIC_FOLDER_FAILURE,
    ADD_NEW_MUSIC_INFO_TO_FOLDER
} from "./musicFoldersAction.js";


const initialState = {
    ids: [],
    musicFolders: [],
    musicSeriesInfo: {},
    editToggleBoolean: false,
    isLoading: false,
    error: ""
};

const musicFoldersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_MUSIC_INFO_TO_FOLDER:
            return {
                ...state,
                musicFolders: state.musicFolders.map(musicFolder =>
                    musicFolder._id === action.payload._id ? action.payload : musicFolder
                ),
            };
        case CREATE_MUSIC_FOLDER_START:
        case UPDATE_MUSIC_FOLDER_START:
        case DELETE_MUSIC_FOLDER_START:
        case FETCH_ALL_MUSIC_FOLDERS_START:
        case FETCH_MUSIC_FOLDER_START:
            return {
                ...state,
                isLoading: true,
            };
        case EDIT_MUSIC_FOLDER_TOGGLE:
            return {
                ...state,
                editToggleBoolean: action.payload,
            };
        case CREATE_MUSIC_FOLDER_SUCCESS:
            return {
                ...state,
                ids: [...state.ids, action.payload["_id"]], // Add the new folder's ID to the ids array
                musicFolders: [...state.musicFolders, action.payload], // Add the new folder to the musicFolders array
                isLoading: false,
            };
        case UPDATE_MUSIC_FOLDER_SUCCESS:
            return {
                ...state,
                musicFolders: state.musicFolders.map(folder => folder["_id"] === action.payload["_id"] ? action.payload : folder),
                isLoading: false,
            };
        case DELETE_MUSIC_FOLDER_SUCCESS:
            return {
                ...state,
                ids: state.ids.filter(id => id !== action.payload),
                musicFolders: state.musicFolders.filter(folder => folder["_id"] !== action.payload),
                isLoading: false,
            };
        case FETCH_ALL_MUSIC_FOLDERS_SUCCESS:
            return {
                ...state,
                ids: action.payload,
                isLoading: false,
            };
        case FETCH_MUSIC_FOLDER_SUCCESS:
            const existingFolderIndex = state.musicFolders.findIndex(folder => folder["_id"] === action.payload["_id"]);
            let updatedMusicFolders = [...state.musicFolders];
            if (existingFolderIndex !== -1) {
                updatedMusicFolders[existingFolderIndex] = action.payload;
            } else {
                console.log("Push folder: " + action.payload)
                updatedMusicFolders.push(action.payload);
            }
            return {
                ...state,
                musicFolders: updatedMusicFolders,
                isLoading: false,
            };
        case UPDATE_MUSIC_FOLDER_FAILURE:
        case DELETE_MUSIC_FOLDER_FAILURE:
        case FETCH_ALL_MUSIC_FOLDERS_FAILURE:
        case FETCH_MUSIC_FOLDER_FAILURE:
        case CREATE_MUSIC_FOLDER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.message || "An error occurred.", // Store the error message
            };

        default:
            return state;
    }
};

export default musicFoldersReducer;