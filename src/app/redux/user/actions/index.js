import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchUserAttempt: [],
  fetchUserSuccess: ['data'],
  fetchUserFailure: ['err'],

  loginUserAttempt: [],
  loginUserSuccess: ['data'],
  loginUserFailure: ['err'],

  logoutUserAttempt: [],
  logoutUserSuccess: [],
  logoutUserFailure: ['err'],

  updatePasswordAttempt: [],
  updatePasswordSuccess: [],
  updatePasswordFailure: ['err'],
});
