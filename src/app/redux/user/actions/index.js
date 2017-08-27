import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchUserAttempt: [],
  fetchUserSuccess: ['data'],
  fetchUserFailure: ['error'],

  loginUserAttempt: [],
  loginUserSuccess: ['data'],
  loginUserFailure: ['error'],

  logoutUserAttempt: [],
  logoutUserSuccess: [],
  logoutUserFailure: ['error'],

  updatePasswordAttempt: [],
  updatePasswordSuccess: [],
  updatePasswordFailure: ['error'],

  registerAttempt: [],
  registerSuccess: ['data'],
  registerFailure: ['error'],
});
