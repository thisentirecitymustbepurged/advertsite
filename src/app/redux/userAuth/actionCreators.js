import * as actionTypes from './types';

export function fetchUserSuccess(user) {
  debugger;
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user,
  };
}
export function fetchUserFailure() {
  return {
    type: actionTypes.FETCH_USER_FAILURE,
  };
}

export function logoutUserSuccess() {
  return {
    type: actionTypes.LOGOUT_USER_SUCCESS,
  };
}
export function logoutUserFailure() {
  return {
    type: actionTypes.LOGOUT_USER_FAILURE,
  };
}

export function loginUserSuccess(user) {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    user,
  };
}
export function loginUserFailure() {
  return {
    type: actionTypes.LOGIN_USER_FAILURE,
  };
}
