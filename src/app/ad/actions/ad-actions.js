import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchAdAttempt: [],
  fetchAdSuccess: ['data'],
  fetchAdFailure: ['err'],

  checkIfUserIsOwnerAttempt: ['attemptingTrue'],
  checkIfUserIsOwnerSuccess: ['isOwner'],
  checkIfUserIsOwnerFailure: ['err'],

  // createAdAttempt: [],
  // createAdSuccess: [],
  // createAdFailure: ['err'],

  updateAdAttempt: [],
  updateAdSuccess: [],
  updateAdFailure: ['err'],

  // deleteAdAttempt: [],
  // deleteAdSuccess: [],
  // deleteAdFailure: ['err'],
});
