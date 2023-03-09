// registrationReducer.js

import { REGISTER_FAILURE } from "redux/actions/types";
import { REGISTER_SUCCESS } from "redux/actions/types";
import { REGISTER_REQUEST } from "redux/actions/types";

const initialState = {
    loading: false,
    error: null,
    registeredAdmin: null,
};

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                registeredAdmin: action.payload,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default registrationReducer;
