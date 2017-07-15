import * as actionTypes from './firebaseUserAuthTypes'

export function fetchFirebaseUserSuccess(user) {  
  return {
    type: actionTypes.FETCH_FIREBASE_USER_SUCCESS,
    user
  }
}
export function fetchFirebaseUserFailure() {
  return {
    type: actionTypes.FETCH_FIREBASE_USER_FAILURE,   
  }
}

export function logoutFirebaseUserSuccess() {  
  return {
    type: actionTypes.LOGOUT_FIREBASE_USER_SUCCESS,
  }
}
export function logoutFirebaseUserFailure() {
  return {
    type: actionTypes.LOGOUT_FIREBASE_USER_FAILURE
  }
}

export function loginFirebaseUserSuccess(user) {  
  return {
    type: actionTypes.LOGIN_FIREBASE_USER_SUCCESS,
    user
  }
}
export function loginFirebaseUserFailure() {
  return {
    type: actionTypes.LOGIN_FIREBASE_USER_FAILURE,
  }
}
