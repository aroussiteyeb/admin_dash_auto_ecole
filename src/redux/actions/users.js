
import { API_BASE_URL } from 'api/base';
import { getUsers } from 'api/users';
import axios from 'axios';
import { DELETE_USER, DELETE_USER_FAILURE, DELETE_USER_SUCCESS, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS } from './types';


// action creator to fetch users from API
export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: GET_USERS_REQUEST });
    try {
        const data = await getUsers();
        if (data.error) {
            dispatch({ type: GET_USERS_FAILURE, payload: data.error });
        } else {
            dispatch({ type: GET_USERS_SUCCESS, payload: data });
        }
        return data

    } catch (error) {
        dispatch({ type: GET_USERS_FAILURE, payload: error.message });
    }


}

export const deleteUser = (userId) => {
    return (dispatch) => {
        dispatch({ type: DELETE_USER });

        return axios.delete(`${API_BASE_URL}users/delete/${userId}`)
            .then((response) => {
                if (response.data.success) {
                    dispatch({
                        type: DELETE_USER_SUCCESS,
                        payload: true,
                    });
                    return response.data;

                }
                

            })
            .catch((error) => {
                dispatch({
                    type: DELETE_USER_FAILURE,
                    payload: true,
                });
                return error.response.data;
            });
    };
};