import { getAbonnements, create, updateById, deleteById } from '../../api/abonnementApi';
import { CREATE_ABONNEMENT_FAILURE, CREATE_ABONNEMENT_REQUEST, CREATE_ABONNEMENT_SUCCESS, DELETE_ABONNEMENT_FAILURE, DELETE_ABONNEMENT_REQUEST, DELETE_ABONNEMENT_SUCCESS, FETCH_ABONNEMENTS_FAILURE, FETCH_ABONNEMENTS_REQUEST, FETCH_ABONNEMENTS_SUCCESS, UPDATE_ABONNEMENT_FAILURE, UPDATE_ABONNEMENT_REQUEST, UPDATE_ABONNEMENT_SUCCESS } from './types';



export const fetchAbonnements = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_ABONNEMENTS_REQUEST });
    getAbonnements()
      .then((response) => {
        dispatch({ type: FETCH_ABONNEMENTS_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_ABONNEMENTS_FAILURE, payload: error });
      });
  };
};

export const createAbonnement = (abonnement) => {
  return (dispatch) => {
    dispatch({ type: CREATE_ABONNEMENT_REQUEST });
    create(abonnement)
      .then((response) => {

        dispatch({ type: CREATE_ABONNEMENT_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: CREATE_ABONNEMENT_FAILURE, payload: error });
      });
  };
};

export const updateAbonnement = (id, abonnement) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_ABONNEMENT_REQUEST });
    updateById(id, abonnement)
      .then((response) => {
        console.log(response)
        dispatch({ type: UPDATE_ABONNEMENT_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_ABONNEMENT_FAILURE, payload: error });
      });
  };
};

export const deleteAbonnement = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_ABONNEMENT_REQUEST });
    deleteById(id)
      .then((response) => {
        dispatch({ type: DELETE_ABONNEMENT_SUCCESS, payload: id });
      })
      .catch((error) => {
        dispatch({ type: DELETE_ABONNEMENT_FAILURE, payload: error });
      });
  };
};
