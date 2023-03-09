import { activate } from "api/auth/activate";
import { VERIFY_EMAIL_FAILURE, VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS } from "../types";

export const verifyEmailRequest = (actiavteData) => {
  return {
    type: VERIFY_EMAIL_REQUEST,
    payload: actiavteData,
  };
};

export const verifyEmailSuccess = (response) => {
  return {
    type: VERIFY_EMAIL_SUCCESS,
    payload: response,
  };
};

export const verifyEmailFailure = (error) => {
  return {
    type: VERIFY_EMAIL_FAILURE,
    payload: error,
  };
};

// Define async action creator
export const verifyEmail = (actiavteData) => {
  return async (dispatch) => {
    dispatch(verifyEmailRequest(actiavteData));

    try {
      // Send verification request to backend API
      const response = await activate(actiavteData);
      dispatch(verifyEmailSuccess(response));
      return response;
    } catch (error) {
      dispatch(verifyEmailFailure(error.message));
      throw error;
    }
  };
};