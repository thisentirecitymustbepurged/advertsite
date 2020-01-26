import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchUserAdsAttempt: [],
  fetchUserAdsSuccess: ['data'],
  fetchUserAdsFailure: ['err'],

  deleteAdAttempt: [],
  deleteAdSuccess: [],
  deleteAdFailure: ['err'],

  updatePasswordAttempt: [],
  updatePasswordSuccess: [],
  updatePasswordFailure: ['error'],
});
