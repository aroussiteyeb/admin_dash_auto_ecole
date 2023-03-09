import { GET_USERS_FAILURE } from "redux/actions/types";
import { GET_USERS_SUCCESS } from "redux/actions/types";
import { GET_USERS_REQUEST } from "redux/actions/types";

// define initial state
const initialState = {
    users: [],
    loading: false,
    error: null,
  };
  
  // define user reducer
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS_REQUEST:
        return { ...state, loading: true };
      case GET_USERS_SUCCESS:
        return { ...state, loading: false, users: action.payload };
      case GET_USERS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  