import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  // SERVICES & API
  fetchUserAttempt: [],
  fetchUserSuccess: ['data'],
  fetchUserFailure: ['error'],

  loginUserAttempt: [],
  loginUserSuccess: ['data'],
  loginUserFailure: ['error'],

  logoutUserAttempt: [],
  logoutUserSuccess: [],
  logoutUserFailure: ['error'],

  registerWithEmailAttempt: [],
  registerWithEmailSuccess: ['data'],
  registerWithEmailFailure: ['error'],

  newAdAttempt: [],
  newAdSuccess: [],
  newAdFailure: ['err'],

  saveAdToUserAdListAttempt: [],
  saveAdToUserAdListSuccess: [],
  saveAdToUserAdListFailure: ['err'],

  // UI
  toggleSideMenu: []
});
