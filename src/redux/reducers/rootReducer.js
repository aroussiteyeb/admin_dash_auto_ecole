// rootReducer.js

import { combineReducers } from 'redux';
import abonnementReducer from './abonnementReducer';
import emailVerificationReducer from './activate';
import authReducer from './login';
import registrationReducer from './register';
import { deleteUserReducer } from './user/deleteUser';
import userReducer from './user/users';

const rootReducer = combineReducers({
  registration: registrationReducer,
  activate : emailVerificationReducer,
  authData : authReducer,
  usersData : userReducer,
  deleteUser : deleteUserReducer,
  abonnementsData : abonnementReducer




});

export default rootReducer;
