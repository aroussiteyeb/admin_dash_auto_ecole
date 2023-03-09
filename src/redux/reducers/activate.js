import { VERIFY_EMAIL_FAILURE } from "redux/actions/types";
import { VERIFY_EMAIL_SUCCESS } from "redux/actions/types";
import { VERIFY_EMAIL_REQUEST } from "redux/actions/types";

// Define initial state
const initialState = {
  verifying: false,
  verifyingResponse: null,
  error: null
};

export default function emailVerificationReducer(state = initialState, action) {
  switch (action.type) {
    case VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        verifying: true,
        verifyingResponse: null,
        error: null
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        verifying: false,
        verifyingResponse: action.payload,
        error: null
      };
    case VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        verifying: false,
        verifyingResponse: null,
        error: action.payload
      };
    default:
      return state;
  }
}