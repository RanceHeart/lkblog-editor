import {
    STORE_MUSIC_INFO_START,
    STORE_MUSIC_INFO_SUCCESS,
    STORE_MUSIC_INFO_FAILURE,
    FETCH_MUSIC_INFO_START,
    FETCH_MUSIC_INFO_SUCCESS,
    FETCH_MUSIC_INFO_FAILURE
} from "./musicInfosAction.js";

const initialMusicSeriesState = {
    musicSeriesInfo: {},
    musicStoreInfo: {},
};


const musicInfosReducer = (state = initialMusicSeriesState, action) => {
    switch (action.type) {
        case STORE_MUSIC_INFO_START:
            return {
                ...state,
                musicStoreInfo: {
                    ...state.musicStoreInfo,
                    [action.payload.link]: { // Assuming youtubeLink is unique and can be used as a key
                        isLoading: true,
                        isSuccess: false
                    }
                }
            };
        case STORE_MUSIC_INFO_SUCCESS:
            return {
                ...state,
                musicStoreInfo: {
                    ...state.musicStoreInfo,
                    [action.payload.link]: {
                        isLoading: false,
                        isSuccess: true
                    }
                },
                musicSeriesInfo: {
                    ...state.musicSeriesInfo,
                    [action.payload._id]: {
                        ...action.payload,
                        isLoading: false,
                        isSuccess: true
                    }
                },
            };
        case STORE_MUSIC_INFO_FAILURE:
            // Save in the store and series at the same time
            return {
                ...state,
                musicStoreInfo: {
                    ...state.musicSeriesInfo,
                    [action.payload.link]: { // Assuming youtubeLink is unique and can be used as a key
                        isLoading: false,
                        isSuccess: false
                    }
                }

            };
        case FETCH_MUSIC_INFO_START:
            return {
                ...state,
                musicSeriesInfo: {
                    ...state.musicSeriesInfo,
                    [action.payload.id]: {
                        ...state.musicSeriesInfo[action.payload.id],
                        isLoading: true,
                        isSuccess: false
                    }
                }
            };
        case FETCH_MUSIC_INFO_SUCCESS:
            return {
                ...state,
                musicSeriesInfo: {
                    ...state.musicSeriesInfo,
                    [action.payload._id]: {
                        ...action.payload,
                        isLoading: false,
                        isSuccess: true
                    }
                }
            };
        case FETCH_MUSIC_INFO_FAILURE:
            return {
                ...state,
                musicSeriesInfo: {
                    ...state.musicSeriesInfo,
                    [action.payload.id]: {
                        ...state.musicSeriesInfo[action.payload.id],
                        isLoading: false,
                        isSuccess: false,
                        error: action.payload.error
                    }
                }
            };

        default:
            return state;
    }
};

export default musicInfosReducer;
