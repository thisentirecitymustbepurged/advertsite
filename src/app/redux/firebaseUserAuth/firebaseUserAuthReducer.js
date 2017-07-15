import * as actionTypes from './firebaseUserAuthTypes'

export default function (state = null, action) {
  switch (action.type) {
    
    case actionTypes.FETCH_FIREBASE_USER_SUCCESS:
      return action.user;
    case actionTypes.FETCH_FIREBASE_USER_FAILURE:
      return state;

    case actionTypes.LOGOUT_FIREBASE_USER_SUCCESS:
      return null;
    case actionTypes.LOGOUT_FIREBASE_USER_FAILURE:
      return state;

    case actionTypes.LOGIN_FIREBASE_USER_SUCCESS:
      return action.user;
    case actionTypes.LOGIN_FIREBASE_USER_FAILURE:
      return state;

    default:
      return state;
  }
}