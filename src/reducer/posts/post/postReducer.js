import {
    READ_POST_START,
    READ_POST_SUCCESS,
    READ_POST_FAILURE,
} from "./postAction.js";

import {
    CREATE_POST_START,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    UPDATE_POST_START,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE
} from "../postsAction.js";

const initialState = {
    post: {
          id: '0',
          title: '',
          image: '',
          tags: [],
          content: '',
          readTime: 1
      },
    isLoading: false
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_POST_START:
        case CREATE_POST_START:
        case UPDATE_POST_START:
            return {
                ...state,
                isLoading: true,
            };
        case READ_POST_SUCCESS:
        case CREATE_POST_SUCCESS:
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                post: action.payload,
                isLoading: false,
            };
        case READ_POST_FAILURE:
        case CREATE_POST_FAILURE:
        case UPDATE_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default postsReducer;
