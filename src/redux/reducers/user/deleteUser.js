import { DELETE_USER_FAILURE } from "redux/actions/types";
import { DELETE_USER_SUCCESS } from "redux/actions/types";
import { DELETE_USER } from "redux/actions/types";




const initialState = {
    loading: false,
    success: false,
    error: false,
};

export const deleteUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_USER:
            return { ...state, loading: true };
        case DELETE_USER_SUCCESS:
            return { ...state, loading: false,   error: false ,success : true };
        case DELETE_USER_FAILURE:
            return { ...state, loading: false, success:false , error: true };
        default:
            return state;
    }
};