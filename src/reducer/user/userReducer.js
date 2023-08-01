// reducers/userReducer.js

import { SET_USER_DATA } from './userAction.js';

const initialState = {
    userData: false,
    isLoading: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
