import {
    FETCH_ABONNEMENTS_REQUEST,
    FETCH_ABONNEMENTS_SUCCESS,
    FETCH_ABONNEMENTS_FAILURE,
    CREATE_ABONNEMENT_SUCCESS,
    UPDATE_ABONNEMENT_SUCCESS,
    DELETE_ABONNEMENT_SUCCESS,
} from '../actions/types';

const initialState = {
    abonnements: [],
    createResponse :null,
    updateResponse :null,
    loading: false,
    error: null,
};

const abonnementReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ABONNEMENTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ABONNEMENTS_SUCCESS:
            return {
                ...state,
                abonnements: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_ABONNEMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CREATE_ABONNEMENT_SUCCESS:
            return {
                ...state,
                createResponse:action.payload,
            };
        case UPDATE_ABONNEMENT_SUCCESS:
            return {
                ...state,
                updateResponse:action.payload,
            };
        case DELETE_ABONNEMENT_SUCCESS:
   
            return {
                ...state,
                abonnements: state.abonnements.filter(
                    (abonnement) => abonnement._id !== action.payload
                ),
            };
            case 'STATE_ABONNEMENT_RESET':
   
            return {
                ...state,
                createResponse:null,
                updateResponse:null
            };
        default:
            return state;
    }
};

export default abonnementReducer;
