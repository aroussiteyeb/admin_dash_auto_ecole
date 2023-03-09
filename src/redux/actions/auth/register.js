
import { register } from 'api/auth/register';
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from '../types'

export const registerAdminRequest = () => ({
  type: REGISTER_REQUEST
});

export const registerAdminSuccess = (admin) => ({
  type: REGISTER_SUCCESS,
  payload: admin
});

export const registerAdminFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error
});

export const registerAdmin = (adminData) => async (dispatch) => {
  dispatch(registerAdminRequest());
  try {
    const admin = await register(adminData);
    dispatch(registerAdminSuccess(admin));
    return admin
  } catch (error) {
    dispatch(registerAdminFailure(error.message));
  }
};





