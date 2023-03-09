import { login } from "api/auth/login";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
} from "../types";

export const authStart = () => ({
    type: LOGIN_REQUEST,
});

export const authSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    token,
});

export const authFailure = (error) => ({
    type: LOGIN_FAILURE,
    error,
});

export const authLogout = () => ({
    type: LOGOUT,
});

export const auth = (email, password) => async (dispatch) => {
    dispatch(authStart());

    try {
        const response = await login(email, password);
        if (response.success) {
            const token = response.accessToken;
            localStorage.setItem("token", token);
            dispatch(authSuccess(token));
        } else {
            dispatch(authFailure(response.message))
        }
    } catch (error) {
        dispatch(authFailure(error.message));
    }
};
export const logout = () => async (dispatch) => {
    localStorage.removeItem("token");
    dispatch(authLogout());
};
