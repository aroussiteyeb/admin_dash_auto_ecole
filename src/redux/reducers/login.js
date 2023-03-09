import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
  } from "../actions/types";
  
  const initialState = {
    token: null,
    error: null,
    loading: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          token: action.token,
          error: null,
          loading: false,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          token:null,
          error: action.error,
          loading: false,
        };
      case LOGOUT:
        return {
          ...state,
          token: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  