import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from './actions';

export const INITIAL_STATE = Immutable({
  data: {},
  ads: {},
  error: {},
  fetchingUser: false,
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingOut: false,
  updatingPassword: false,
  isRegistering: false
});

// FETCH USER
const fetchUserAttempt = (state) =>
  state.merge({
    fetchingUser: true
  });

const fetchUserSuccess = (state, { data }) => {
  const result = data
    ? state.merge({
      data,
      fetchingUser: false,
      isLoggedIn: true
    })
    : state;
  return result;
};

const fetchUserFailure = (state, { error }) =>
  state.merge({
    error,
    fetchingUser: false
  });

// LOGIN USER
const loginUserAttempt = (state) =>
  state.merge({
    isLoggingIn: true
  });
const loginUserSuccess = (state, { data }) =>
  state.merge({
    data,
    isLoggingIn: false,
    isLoggedIn: true
  });
const loginUserFailure = (state, { error }) =>
  state.merge({
    error,
    isLoggingIn: false
  });

// LOGOUT USER
const logoutUserAttempt = (state) =>
  state.merge({
    isLoggingOut: true
  });
const logoutUserSuccess = (state) =>
  state.merge({
    data: {},
    isLoggingOut: false,
    isLoggedIn: false
  });
const logoutUserFailure = (state, { error }) =>
  state.merge({
    error,
    isLoggingOut: false
  });

// UPDATE PASSWORD
const updatePasswordAttempt = (state) =>
  state.merge({
    updatingPassword: true
  });
const updatePasswordSuccess = (state) =>
  state.merge({
    updatingPassword: false
  });
const updatePasswordFailure = (state, { error }) =>
  state.merge({
    error,
    updatingPassword: false
  });

// REGISTER WITH EMAIL
const registerAttempt = (state) =>
  state.merge({
    isRegistering: true
  });
const registerSuccess = (state, { data }) =>
  state.merge({
    data,
    isRegistering: false,
    isLoggedIn: true
  });
const registerFailure = (state, { error }) =>
  state.merge({
    error,
    isRegistering: false
  });

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_USER_ATTEMPT]: fetchUserAttempt,
  [Types.FETCH_USER_SUCCESS]: fetchUserSuccess,
  [Types.FETCH_USER_FAILURE]: fetchUserFailure,

  [Types.LOGIN_USER_ATTEMPT]: loginUserAttempt,
  [Types.LOGIN_USER_SUCCESS]: loginUserSuccess,
  [Types.LOGIN_USER_FAILURE]: loginUserFailure,

  [Types.LOGOUT_USER_ATTEMPT]: logoutUserAttempt,
  [Types.LOGOUT_USER_SUCCESS]: logoutUserSuccess,
  [Types.LOGOUT_USER_FAILURE]: logoutUserFailure,

  [Types.UPDATE_PASSWORD_ATTEMPT]: updatePasswordAttempt,
  [Types.UPDATE_PASSWORD_SUCCESS]: updatePasswordSuccess,
  [Types.UPDATE_PASSWORD_FAILURE]: updatePasswordFailure,

  [Types.REGISTER_ATTEMPT]: registerAttempt,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.REGISTER_FAILURE]: registerFailure,
});

